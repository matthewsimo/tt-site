import xmlToJson from './xmlToJson';

export type Role =
	| 'HQ'
	| 'Troops'
	| 'Elites'
	| 'Fast Attack'
	| 'Flyer'
	| 'Heavy Support'
	| 'Fortification'
	| 'Lord of War'
	| 'Dedicated Transport';

interface Cost {
	pts: number;
	pl: number;
	cp: number;
}

export interface UnitProfile {
	name: string;
	count: number;
	m: string;
	ws: string;
	bs: string;
	s: string;
	t: string;
	w: string;
	a: string;
	ld: string;
	sv: string;
	subProfiles: { name: string; count: number }[];
}

export interface WeaponProfile {
	name: string;
	rng: string;
	type: string;
	s: string;
	ap: string;
	d: string;
	abilities: string;
}

export interface UnitAbility {
	title?: string;
	content: string;
}

export interface Unit {
	name: string;
	role: string;
	cost: Cost;
	profiles: UnitProfile[];
	weapons: WeaponProfile[];
	abilities: UnitAbility[];
	factions: string[];
	keywords: string[];
}

export interface Force {
	name: string;
	catalogueName: string;
	cost: Cost;
	units: Unit[];
	rules: UnitAbility[];
}

export interface Roster {
	meta: {
		tttVersion: string;
		gameSystemName: string;
		catalogueName: string;
		battleScribeVersion: string;
		name: string;
		cost: Cost;
	};
	forces: Force[];
}

const parseRoster = (rawRoster: XMLDocument): Roster | undefined => {
	if (!rawRoster) return;

	const roster: Roster = {
		meta: {
			tttVersion: '0.0.1',
			gameSystemName:
				rawRoster?.querySelector('roster')?.getAttributeNode('gameSystemName')?.nodeValue ||
				'unknown',
			catalogueName: rawRoster?.querySelector('force')?.getAttribute('catalogueName') || 'unknown',
			battleScribeVersion:
				rawRoster?.querySelector('roster')?.getAttributeNode('battleScribeVersion')?.nodeValue ||
				'unknown',
			name: rawRoster?.querySelector('roster')?.getAttributeNode('name')?.nodeValue || 'unknown',
			cost: {
				pts: parseInt(
					rawRoster?.querySelector('roster > costs cost[name="pts"]')?.getAttribute('value') || '0'
				),
				pl: parseInt(
					rawRoster?.querySelector('roster > costs cost[name=" PL"]')?.getAttribute('value') || '0'
				),
				cp: parseInt(
					rawRoster?.querySelector('roster > costs cost[name="CP"]')?.getAttribute('value') || '0'
				)
			}
		},
		forces: parseForces(rawRoster)
	};

	// console.log({ roster });
	return roster;
};

const parseForces = (rawRoster: XMLDocument): Force[] => {
	const forces: Force[] = [];

	// console.log({ rawRoster, json: xmlToJson(rawRoster) });

	const forceEls = rawRoster.querySelectorAll('roster > forces > force') || [];
	for (const forceEl of Array.from(forceEls)) {
		const force: Force = {
			name: forceEl.getAttribute('name') || 'unknown',
			catalogueName: forceEl.getAttribute('catalogueName') || 'unknown',
			cost: {
				pts: getUnitCost(forceEl, 'pts'),
				pl: getUnitCost(forceEl, ' PL'),
				cp: getUnitCost(forceEl, 'CP')
			},
			units: parseUnits(forceEl),
			rules: parseRules(forceEl)
		};

		forces.push(force);
	}

	return forces;
};

const parseRules = (rawForce: Element): any[] => {
	const rules: any[] = [];
	// @TODO - Make Detachment Rule parsing better

	rawForce
		.querySelectorAll('roster > forces > force > selections > selection[type="upgrade"]')
		.forEach((rawRule) => {
			if (rawRule.getAttribute('name') !== 'Detachment Command Cost') {
				const subrules = rawRule.querySelectorAll('selection');

				if (subrules.length > 0) {
					subrules.forEach((subrule) => {
						// console.log({ subrule, json: xmlToJson(subrule) });

						const rule = {
							title: `${rawRule.getAttribute('name')}: ${subrule.getAttribute('name')}`,
							content: Array.from(subrule.querySelectorAll('characteristic')).map(
								(char) => char.textContent
							)
						};

						rules.push(rule);
					});
				} else {
					const rule = {
						title: `${rawRule.getAttribute('name')}`
					};

					rules.push(rule);
				}
			}
			// console.log({ rawRule, json: xmlToJson(rawRule), rules });
		});

	return rules;
};

const getUnitCost = (selection: Element, costType: 'pts' | ' PL' | 'CP'): number => {
	let total = 0;
	const costs = selection.querySelectorAll(`costs cost[name="${costType}"]`);
	for (const cost of Array.from(costs)) {
		total += parseInt(cost.getAttribute('value') || '0');
	}

	return total;
};

export const sortByRole = (unitA: Unit, unitB: Unit): number => {
	const RoleWeight: Record<string, number> = {
		HQ: 0,
		Troops: 1,
		Elites: 2,
		'Fast Attack': 3,
		Flyer: 4,
		'Heavy Support': 5,
		Fortification: 6,
		'Dedicated Transport': 7,
		'Lord of War': 8
	};

	return RoleWeight[unitA.role] - RoleWeight[unitB.role];
};

const buildProfile = (rawProfile: Element): UnitProfile => {
	return {
		name: rawProfile.getAttribute('name') || 'unknown',
		m: rawProfile.querySelector('characteristic[name="M"]')?.textContent || '',
		ws: rawProfile.querySelector('characteristic[name="WS"]')?.textContent || '',
		bs: rawProfile.querySelector('characteristic[name="BS"]')?.textContent || '',
		s: rawProfile.querySelector('characteristic[name="S"]')?.textContent || '',
		t: rawProfile.querySelector('characteristic[name="T"]')?.textContent || '',
		w: rawProfile.querySelector('characteristic[name="W"]')?.textContent || '',
		a: rawProfile.querySelector('characteristic[name="A"]')?.textContent || '',
		ld: rawProfile.querySelector('characteristic[name="Ld"]')?.textContent || '',
		sv: rawProfile.querySelector('characteristic[name="Save"]')?.textContent || '',
		count: 0,
		subProfiles: []
	};
};

const parseUnitProfiles = (rawUnit: Element): UnitProfile[] => {
	const unitName = rawUnit.getAttribute('name');
	const unitNumber = rawUnit.getAttribute('number');
	const unitType = rawUnit.getAttribute('type');
	// console.log({ unitName, unitNumber, unitType });
	// console.log('================');
	const profiles: UnitProfile[] = [];

	const rawProfiles = rawUnit.querySelectorAll("profile[typeName='Unit'");
	rawProfiles.forEach((rawProfile: Element) => {
		const profile = buildProfile(rawProfile);

		if (unitType === 'unit') {
			// console.log('UNIT', profile.name);
			profile.subProfiles = [];

			const rawSubProfiles = rawUnit.querySelectorAll(
				`selection[type='model'][name^="${profile.name}"]`
			);
			rawSubProfiles.forEach((rawSubProfile: Element) => {
				const subProfile = {
					name: rawSubProfile.getAttribute('name') || 'unknown',
					count: parseInt(rawSubProfile.getAttribute('number') || '0')
				};
				// console.log({ subProfile, json: xmlToJson(rawSubProfile) });
				if (subProfile.name === profile.name) {
					profile.count = subProfile.count;
				} else {
					profile.subProfiles.push(subProfile);
				}
			});
			// const rawProfiles = rawUnit.querySelectorAll("profile[typeName='Unit'");
			// rawProfiles.forEach((rawProfile: Element) => {
			// 	profiles.push(buildProfile(rawProfile));
			// });
			// const matchingUnitSelection = rawUnit.querySelector(`selection[name^="${profile.name}"]`);
			// const json = matchingUnitSelection ? xmlToJson(matchingUnitSelection) : null;
			// const number = parseInt(matchingUnitSelection?.getAttribute('number') || '0');
			// console.log('isUnit', { number, matchingUnitSelection, json });
			// profile.number = number;
		}

		profiles.push(profile);
	});

	// console.log({ profiles, rawUnitJson: xmlToJson(rawUnit) });
	return profiles;
};

const profileMatch = (profileA: WeaponProfile, profileB: WeaponProfile): boolean => {
	return (
		profileA.name === profileB.name &&
		profileA.rng === profileB.rng &&
		profileA.type === profileB.type &&
		profileA.s === profileB.s &&
		profileA.ap === profileB.ap &&
		profileA.d === profileB.d &&
		profileA.abilities === profileB.abilities
	);
};

const parseWeaponProfiles = (rawUnit: Element): WeaponProfile[] => {
	const profiles: WeaponProfile[] = [];
	rawUnit.querySelectorAll("profile[typeName='Weapon'").forEach((rawProfile: Element) => {
		const profile: WeaponProfile = {
			name: rawProfile.getAttribute('name') || 'unknown',
			rng: rawProfile.querySelector('characteristic[name="Range"]')?.textContent || '',
			type: rawProfile.querySelector('characteristic[name="Type"]')?.textContent || '',
			s: rawProfile.querySelector('characteristic[name="S"]')?.textContent || '',
			ap: rawProfile.querySelector('characteristic[name="AP"]')?.textContent || '',
			d: rawProfile.querySelector('characteristic[name="D"]')?.textContent || '',
			abilities: rawProfile.querySelector('characteristic[name="Abilities"]')?.textContent || ''
		};

		if (!profiles.some((prof) => profileMatch(prof, profile))) {
			profiles.push(profile);
		}
	});

	profiles.sort((profileA: WeaponProfile, profileB: WeaponProfile): number => {
		const valA = profileA.rng.includes('"') ? parseInt(profileA.rng.split('"')[0]) : -200;
		const valB = profileB.rng.includes('"') ? parseInt(profileB.rng.split('"')[0]) : -200;
		return valA > valB ? -1 : valA < valB ? 1 : 0;
	});

	return profiles;
};

const abilityMatch = (profileA: UnitAbility, profileB: UnitAbility): boolean => {
	return profileA.title === profileB.title && profileA.content === profileB.content;
};

const parseAbilities = (rawUnit: Element): UnitAbility[] => {
	const abilities: UnitAbility[] = [];
	rawUnit.querySelectorAll('rule').forEach((rawProfile: Element) => {
		const profile: UnitAbility = {
			title: rawProfile?.getAttribute('name') || undefined,
			content: rawProfile.querySelector('description')?.textContent || ''
		};

		if (!abilities.some((ability) => abilityMatch(ability, profile))) {
			abilities.push(profile);
		}
	});

	rawUnit.querySelectorAll("profile[typeName='Abilities']").forEach((rawProfile: Element) => {
		const profile: UnitAbility = {
			title: rawProfile?.getAttribute('name') || undefined,
			content: rawProfile.querySelector('characteristic[name="Description"]')?.textContent || ''
		};

		abilities.push(profile);
	});

	return abilities;
};

const parseKeywords = (rawUnit: Element): { keywords: string[]; factions: string[] } => {
	const data: { keywords: string[]; factions: string[] } = {
		keywords: [],
		factions: []
	};

	rawUnit.querySelectorAll('category').forEach((category) => {
		const value = category.getAttribute('name') || 'unknown';
		if (value.startsWith('Faction: ')) {
			data.factions.push(value.slice(9));
		} else {
			data.keywords.push(value);
		}
	});

	data.keywords.sort();
	data.factions.sort();

	return data;
};

const parseUnits = (rawForce: Element): Unit[] => {
	const units: Unit[] = [];

	rawForce
		.querySelectorAll('roster > forces > force > selections > selection')
		.forEach((selection) => {
			if (selection.getAttribute('type')?.toLowerCase() !== 'upgrade') {
				const { keywords, factions } = parseKeywords(selection);

				const unit: Unit = {
					name: selection.getAttribute('name') || 'unknown',
					role:
						selection.querySelector("categories category[primary='true']")?.getAttribute('name') ||
						'unknown',
					cost: {
						pts: getUnitCost(selection, 'pts'),
						pl: getUnitCost(selection, ' PL'),
						cp: getUnitCost(selection, 'CP')
					},
					profiles: parseUnitProfiles(selection),
					weapons: parseWeaponProfiles(selection),
					abilities: parseAbilities(selection),
					factions,
					keywords
				};

				// console.log({ unit, selection, json: xmlToJson(selection) });

				units.push(unit);
			}
		});

	units.sort(sortByRole);

	return units;
};

export default parseRoster;
