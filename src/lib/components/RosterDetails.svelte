<script lang="ts">
	import { sortByRole, type Roster, type Unit } from '../parseRoster';
	import RollIcon from './RollIcon.svelte';
	import RosterHeader from './RosterHeader.svelte';
	import RosterUnit from './RosterUnit.svelte';

	export let roster: Roster;

	let currentTab = 0;
	let rolesInRoster: Map<string, Unit[]> = new Map();
	let units: Unit[] = [];

	const tabs: { title: string }[] = [
		{
			title: 'All'
		}
	];

	const generateTabs = (roster: Roster): void => {
		units = roster.forces.flatMap((force) => force.units);
		units.sort(sortByRole);
		for (const unit of units) {
			if (!rolesInRoster.has(unit.role)) {
				rolesInRoster.set(unit.role, [unit]);
			} else {
				const currentUnitsForRole = rolesInRoster.get(unit.role) || [];
				rolesInRoster.set(unit.role, [...currentUnitsForRole, unit]);
			}
		}

		for (const [role] of rolesInRoster) {
			tabs.push({ title: role });
		}
	};

	generateTabs(roster);

	const handleTabClick = (e: Event, i: number) => {
		currentTab = i;
	};

	const handleChange = (e: Event) => {
		const { value = '0' } = e.target as HTMLSelectElement;
		currentTab = parseInt(value);
	};
</script>

<div class="my-20">
	<RosterHeader {roster} />

	{#if tabs.length > 2}
		<select
			class="select select-bordered w-full max-w-xs lg:hidden"
			on:change|preventDefault={(e) => handleChange(e)}
		>
			{#each tabs as tab, index}
				<option value={index} class={`${index === currentTab ? 'selected' : ''}`}
					>{tab.title}</option
				>
			{/each}
		</select>

		<div class="mx-auto max-w-5xl tabs w-full hidden lg:block border-b border-b-base-content/20">
			{#each tabs as tab, index}
				<button
					class={`tab ${index === currentTab ? 'tab-bordered tab-active' : ''}`}
					on:click|preventDefault={(e) => handleTabClick(e, index)}
				>
					{tab.title}
				</button>
			{/each}
		</div>
	{/if}
	<div class="mx-auto flex flex-col w-full max-w-5xl gap-5 py-5">
		{#each [...rolesInRoster] as [role, unitsForRole]}
			{#if currentTab === 0}
				<div
					class="text-center text-primary-content bg-primary border-y-2 border-y-primary-content py-2 mt-8 first:mt-2"
				>
					<RollIcon {role} />
					{role}
					<RollIcon {role} />
				</div>
			{/if}
			{#if currentTab === 0 || role === tabs[currentTab].title}
				{#each unitsForRole as unit}
					<RosterUnit {unit} />
				{/each}
			{/if}
		{/each}
	</div>
</div>
