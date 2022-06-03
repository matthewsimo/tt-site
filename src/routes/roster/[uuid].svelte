<script lang="ts">
	import RosterDetails from '$lib/components/RosterDetails.svelte';
	import type { Roster } from '$lib/parseRoster';
	import { fly } from 'svelte/transition';

	export let roster: Roster;
</script>

{#if roster}
	<div transition:fly>
		<RosterDetails {roster} />
	</div>
{/if}
