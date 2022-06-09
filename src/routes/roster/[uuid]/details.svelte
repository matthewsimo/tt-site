<script lang="ts">
	import RosterDetails from '$lib/components/RosterDetails.svelte';
	import type { Roster } from '$lib/parseRoster';
	import { fly } from 'svelte/transition';

	export let roster: Roster;

	$: title = `40k tt roster: ${roster.meta.name} - ${roster.meta.catalogueName} ${roster.meta.cost.cp}CP, ${roster.meta.cost.pts}PTS, ${roster.meta.cost.pl}PL`;
	$: desc = `${roster.forces.length} Force${roster.forces.length > 1 ? 's' : ''}, ${roster.forces.map(force => force.units.length).reduce((pV, cV) => (pV + cV), 0) } Unit${ roster.forces.map(force => force.units.length).reduce((pV, cV) => (pV + cV), 0) > 1 ? 's' : ''}`
</script>

<svelte:head>
	<meta property="og:title" content={title}/>
	<meta property="og:description" content={desc}/>
</svelte:head>

{#if roster}
	<div transition:fly>
		<RosterDetails {roster} />
	</div>
{/if}
