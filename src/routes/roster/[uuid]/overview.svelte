<script lang="ts">
	import RosterPreview from '$lib/components/RosterPreview.svelte';
	import type { Roster } from '$lib/parseRoster';
import { prevent_default } from 'svelte/internal';
	import { fly } from 'svelte/transition';

	export let roster: Roster;
</script>

<svelte:head>
	<meta property="og:title" content={`40k tt roster: ${roster.meta.name} - ${roster.meta.catalogueName} ${roster.meta.cost.cp} CP ${roster.meta.cost.pts} PTS ${roster.meta.cost.pl} PL`}/>
	<meta property="og:description" content={`${roster.forces.length} Force${roster.forces.length > 1 && 's'}, ${roster.forces.map(force => force.units.length).reduce((pV, cV) => (pV + cV), 0) } Unit(s)`}/>
</svelte:head>

{#if roster}
	<div transition:fly>
		<RosterPreview {roster} />
	</div>
{/if}
