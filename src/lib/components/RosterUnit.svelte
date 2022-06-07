<script lang="ts">
	import type { Unit } from '$lib/parseRoster';
	import RollIcon from './RollIcon.svelte';
	import WarlordIcon from './WarlordIcon.svelte';

	export let unit: Unit;
</script>

<div>
	<h4 class="text-center bg-base-content text-base-100 rounded-t-lg py-1">
		<span>
			<RollIcon role={unit.role} size={24} />
		</span>
		{unit.name}
		{#if unit.keywords.includes('Warlord')}
			<WarlordIcon />
		{/if}
	</h4>
	<div class="overflow-x-auto flex flex-col">
		{#if unit.profiles.length > 0}
			<table class="table table-zebra w-full border border-base-content rounded-none">
				<thead>
					<tr class="border-b border-b-base-content">
						<th class="align-top normal-case text-xs strip-radius">Name</th>
						<th class="align-top normal-case text-xs text-center">M</th>
						<th class="align-top normal-case text-xs text-center">WS</th>
						<th class="align-top normal-case text-xs text-center">BS</th>
						<th class="align-top normal-case text-xs text-center">S</th>
						<th class="align-top normal-case text-xs text-center">T</th>
						<th class="align-top normal-case text-xs text-center">W</th>
						<th class="align-top normal-case text-xs text-center">A</th>
						<th class="align-top normal-case text-xs text-center">Ld</th>
						<th class="align-top normal-case text-xs text-center strip-radius">Sv</th>
					</tr>
				</thead>
				<tbody>
					{#each unit.profiles as profile}
						<tr>
							<td class="align-top whitespace-normal text-base strip-radius"
								>{profile.name} {#if profile.count > 0}(x{profile.count}){/if}
							</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.m}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.ws}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.bs}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.s}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.t}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.w}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.a}</td>
							<td class="align-top whitespace-normal text-base text-center">{profile.ld}</td>
							<td class="align-top whitespace-normal text-base text-center strip-radius"
								>{profile.sv}</td
							>
						</tr>
						{#if profile.subProfiles.length > 0}
						<tr>
							<td colspan="10" class="align-top whitespace-normal text-sm italic px-12 strip-radius"
							>
								<ul class="list-disc">
									{#each profile.subProfiles as subProfile }
									<li>
										{subProfile.name} (x{subProfile.count})
									</li>
									{/each}
								</ul>
							</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		{/if}

		{#if unit.weapons.length > 0}
			<table class="table table-zebra w-full border border-base-content border-t-0">
				<thead>
					<tr class="border-b border-b-base-content">
						<th class="align-top normal-case text-xs strip-radius">Weapon</th>
						<th class="align-top normal-case text-xs text-center">Range</th>
						<th class="align-top normal-case text-xs text-center">Type</th>
						<th class="align-top normal-case text-xs text-center">S</th>
						<th class="align-top normal-case text-xs text-center">AP</th>
						<th class="align-top normal-case text-xs text-center">D</th>
						<th class="align-top normal-case text-xs strip-radius">Abilities</th>
					</tr>
				</thead>
				<tbody>
					{#each unit.weapons as weapon}
						<tr>
							<td class="align-top whitespace-normal text-base strip-radius">{weapon.name}</td>
							<td class="align-top whitespace-normal text-base text-center">{weapon.rng}</td>
							<td class="align-top whitespace-normal text-base text-center">{weapon.type}</td>
							<td class="align-top whitespace-normal text-base text-center">{weapon.s}</td>
							<td class="align-top whitespace-normal text-base text-center">{weapon.ap}</td>
							<td class="align-top whitespace-normal text-base text-center">{weapon.d}</td>
							<td class="align-top whitespace-normal text-sm max-w-xs strip-radius"
								>{weapon.abilities}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}

		{#if unit.abilities.length > 0}
			<table class="table w-full border border-base-content border-t-0">
				<tbody>
					<tr>
						<th class="align-top text-sm whitespace-normal w-1/5">Abilities:</th>
						<td class="align-top whitespace-normal">
							{#each unit.abilities as ability}
								<p class="text-sm mb-4 last:mb-0">
									<strong>{ability.title}: </strong>{ability.content}
								</p>
							{/each}
						</td>
					</tr>
				</tbody>
			</table>
		{/if}

		{#if unit.factions.length > 0}
			<table class="table w-full border border-base-content border-t-0">
				<tbody>
					<tr>
						<th class="align-top text-sm whitespace-normal w-1/5 rounded-b-lg">Factions:</th>
						<td class="align-top whitespace-normal">
							<p class="text-sm mb-2">
								{#each unit.factions as faction, i}
									{#if i !== 0}, {/if}{faction}
								{/each}
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		{/if}

		{#if unit.keywords.length > 0}
			<table class="table w-full border border-base-content border-t-0">
				<tbody>
					<tr>
						<th class="align-top text-sm whitespace-normal w-1/5 rounded-b-lg">Keywords:</th>
						<td class="align-top whitespace-normal">
							<p class="text-sm mb-2">
								{#each unit.keywords as keyword, i}
									{#if i !== 0}, {/if}{keyword}
								{/each}
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		{/if}
	</div>
</div>

<style>
	.strip-radius {
		border-top-left-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
</style>
