<script lang="ts">
	import { browser } from '$app/env';
	import RosterDetails from '$lib/components/RosterDetails.svelte';
	import RosterPreview from '$lib/components/RosterPreview.svelte';
	import type { Roster } from '$lib/parseRoster';
	import parseRoster from '$lib/parseRoster';

	export let rawRoster: string;
	let list: XMLDocument;
	let roster: Roster | undefined;

	if (browser) {
		const parser = new DOMParser();
		list = parser.parseFromString(rawRoster, 'text/xml');
		roster = parseRoster(list);
	}
</script>

<div class="collapse">
	<input type="checkbox" class="peer" />
	<div class="collapse-title">Code</div>
	<div class="collapse-content">
		<pre>
			{JSON.stringify(roster, null, 2)}
			</pre>
	</div>
</div>

{#if roster}
	<div class="collapse">
		<input type="checkbox" class="peer" />
		<div class="collapse-title">Preview</div>
		<div class="collapse-content">
			<RosterPreview {roster} />
		</div>
	</div>
{/if}

{#if roster}
	<RosterDetails {roster} />
{/if}
