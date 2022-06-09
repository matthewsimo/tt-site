<script lang="ts">
	import RosterPreview from '$lib/components/RosterPreview.svelte';
	import type { Roster } from '$lib/parseRoster';
	import { fly } from 'svelte/transition';

	export let roster: Roster;
</script>

<svelte:head>
	<meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
	<meta property="og:type"               content="article" />
	<meta property="og:title"              content="When Great Minds Don’t Think Alike" />
	<meta property="og:description"        content="How much does culture influence creative thinking?" />
</svelte:head>

{#if roster}
	<div transition:fly>
		<RosterPreview {roster} />
	</div>
{/if}
