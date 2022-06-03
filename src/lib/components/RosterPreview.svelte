<script lang="ts">
	import type { Roster } from '../parseRoster';
	import RollIcon from './RollIcon.svelte';
	import RosterHeader from './RosterHeader.svelte';
	import WarlordIcon from './WarlordIcon.svelte';

	export let roster: Roster;
	const forces = roster.forces || [];
</script>

<div class="my-20">
	<RosterHeader {roster} />

	{#each forces as { units = [], name, catalogueName, rules }, index}
		<div class="overflow-x-auto max-w-5xl mx-auto my-8 border border-secondary rounded-lg">
			<table class="table table-compact w-full">
				<thead>
					<tr>
						<th colspan="6">
							<h3 class="py-2">
								{catalogueName}: {name}
							</h3>

							{#if rules.length > 0}
								<div class="text-left text-sm normal-case font-light p-4">
									<div class="align-top whitespace-normal">
										{#each rules as rule}
											<div class="mb-4 last:mb-0 space-y-2">
												<p>
													<strong>{rule.title}</strong>
												</p>
												{#if rule.content}
													<p class="italic text whitespace-pre-line">
														{rule.content}
													</p>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</th>
					</tr>
					<tr>
						<th />
						<th>Name</th>
						<th>Role</th>
						<th>Pts</th>
						<th>PL</th>
						<th>CP</th>
					</tr>
				</thead>
				<tbody>
					{#each units as unit, index}
						<tr class="hover">
							<td>{index + 1}</td>
							<td
								>{#if unit.keywords.includes('Warlord')}
									<WarlordIcon />
								{/if}{unit.name}</td
							>
							<td><RollIcon role={unit.role} /> <span class="mx-1">{unit.role}</span></td>
							<td>{unit.cost.pts}</td>
							<td>{unit.cost.pl}</td>
							<td>{unit.cost.cp}</td>
						</tr>
					{:else}
						<tr>
							<th colspan="6">No Units</th>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th />
						<th colspan="2">{roster.meta.name}</th>
						<th>{units.reduce((pV, cV) => pV + cV.cost.pts, 0)}</th>
						<th>{units.reduce((pV, cV) => pV + cV.cost.pl, 0)}</th>
						<th>{units.reduce((pV, cV) => pV + cV.cost.cp, 0)}</th>
					</tr>
				</tfoot>
			</table>
		</div>
	{/each}
</div>

<style>
	th,
	td {
		text-align: center;
	}

	th:nth-child(2),
	td:nth-child(2),
	td:nth-child(3),
	thead th:nth-child(3) {
		text-align: left;
	}

	td:nth-child(1),
	th:nth-child(1):not([colspan='6']) {
		width: 44px;
	}

	td:nth-child(3) {
		width: 240px;
	}

	td:nth-child(4) {
		width: 80px;
	}

	td:nth-child(5),
	td:nth-child(6) {
		width: 60px;
	}
</style>
