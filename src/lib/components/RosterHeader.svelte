<script lang="ts">
	import type { Roster } from '$lib/parseRoster';
	export let roster: Roster;
</script>

<div class="mx-auto max-w-5xl my-5 w-full flex justify-between flex-wrap">
	<div class="grow">
		<h2 class="text-4xl font-semibold my-2">{roster.meta.name}</h2>
		<h3 class="text-xl font-light my-2">
			{roster.meta.catalogueName}
		</h3>
	</div>
	<div class="stats shadow bg-base-300 border-base-300 border">
		<div class="stat">
			<div class="stat-title">PTS</div>
			<div class="stat-value">{roster.meta.cost.pts}</div>
		</div>
		<div class="stat">
			<div class="stat-title">PL</div>
			<div class="stat-value">{roster.meta.cost.pl}</div>
		</div>
		<div class="stat">
			<div class="stat-title">CP</div>
			<div class="stat-value">{roster.meta.cost.cp}</div>
		</div>
	</div>
</div>
