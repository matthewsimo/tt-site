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
	<div class="collapse-title">Button</div>
	<div class="collapse-content space-y-6">
		<div>
			<h3 class="mb-6">Normal</h3>
			<button class="btn">Button</button>
			<button class="btn btn-primary">Button</button>
			<button class="btn btn-secondary">Button</button>
			<button class="btn btn-accent">Button</button>
			<button class="btn btn-ghost">Button</button>
			<button class="btn btn-link">Button</button>
		</div>
		<div>
			<h3 class="mb-6">Disabled</h3>
			<button class="btn btn-disabled">Button</button>
			<button class="btn btn-disabled btn-primary">Button</button>
			<button class="btn btn-disabled btn-secondary">Button</button>
			<button class="btn btn-disabled btn-accent">Button</button>
			<button class="btn btn-disabled btn-ghost">Button</button>
			<button class="btn btn-disabled btn-link">Button</button>
		</div>
		<div>
			<h3 class="mb-6">Outline</h3>
			<button class="btn btn-outline">Button</button>
			<button class="btn btn-outline btn-primary">Button</button>
			<button class="btn btn-outline btn-secondary">Button</button>
			<button class="btn btn-outline btn-accent">Button</button>
		</div>
	</div>
</div>


<div class="collapse">
	<input type="checkbox" class="peer" />
	<div class="collapse-title">Card</div>
	<div class="collapse-content space-y-6">
		<div>
			<h3 class="mb-6">Normal</h3>
			<div class="card w-96 shadow-xl">
				<div class="card-body">
					<div class="card-actions justify-end">
						<div class="form-control w-full max-w-xs">
							<label class="label" for="dice-num">
								<span class="label-text">Number of Dice</span>
							</label>
							<input
								id="dice-num"
								type="number"
								min="1"
								step="1"
								placeholder="Number of dice"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<select class="select select-bordered w-full max-w-xs">
							<option disabled selected value={undefined}>Dice Type</option>
							<option>D6</option>
							<option>D3</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Primary</h3>
			<div class="card w-96 shadow-xl bg-primary text-primary-content">
				<div class="card-body">
					<div class="card-actions justify-end">
						<div class="form-control w-full max-w-xs">
							<label class="label" for="dice-num">
								<span class="label-text">Number of Dice</span>
							</label>
							<input
								id="dice-num"
								type="number"
								min="1"
								step="1"
								placeholder="Number of dice"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<select class="select select-bordered select-primary w-full max-w-xs">
							<option disabled selected value={undefined}>Dice Type</option>
							<option>D6</option>
							<option>D3</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Secondary</h3>
			<div class="card w-96 shadow-xl bg-secondary text-secondary-content">
				<div class="card-body">
					<div class="card-actions justify-end">
						<div class="form-control w-full max-w-xs">
							<label class="label" for="dice-num">
								<span class="label-text">Number of Dice</span>
							</label>
							<input
								id="dice-num"
								type="number"
								min="1"
								step="1"
								placeholder="Number of dice"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<select class="select select-bordered select-primary w-full max-w-xs">
							<option disabled selected value={undefined}>Dice Type</option>
							<option>D6</option>
							<option>D3</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Accent</h3>
			<div class="card w-96 shadow-xl bg-accent text-accent-content">
				<div class="card-body">
					<div class="card-actions justify-end">
						<div class="form-control w-full max-w-xs">
							<label class="label" for="dice-num">
								<span class="label-text">Number of Dice</span>
							</label>
							<input
								id="dice-num"
								type="number"
								min="1"
								step="1"
								placeholder="Number of dice"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<select class="select select-bordered select-accent w-full max-w-xs">
							<option disabled selected value={undefined}>Dice Type</option>
							<option>D6</option>
							<option>D3</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Neutral</h3>
			<div class="card w-96 shadow-xl bg-neutral text-neutral-content">
				<div class="card-body">
					<div class="card-actions justify-end">
						<div class="form-control w-full max-w-xs">
							<label class="label" for="dice-num">
								<span class="label-text">Number of Dice</span>
							</label>
							<input
								id="dice-num"
								type="number"
								min="1"
								step="1"
								placeholder="Number of dice"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<select class="select select-bordered w-full max-w-xs">
							<option disabled selected value={undefined}>Dice Type</option>
							<option>D6</option>
							<option>D3</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<div class="collapse">
	<input type="checkbox" class="peer" />
	<div class="collapse-title">Stat</div>
	<div class="collapse-content space-y-6">
		<div>
			<h3 class="mb-6">Normal</h3>
			<div class="stats shadow">
				<div class="stat">
					<div class="stat-title">Total Page Views</div>
					<div class="stat-value">89,400</div>
					<div class="stat-desc">21% more than last month</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Primary</h3>
			<div class="stats shadow bg-primary text-primary-content">
				<div class="stat">
					<div class="stat-title">Total Page Views</div>
					<div class="stat-value">89,400</div>
					<div class="stat-desc">21% more than last month</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Secondary</h3>
			<div class="stats shadow bg-secondary text-secondary-content">
				<div class="stat">
					<div class="stat-title">Total Page Views</div>
					<div class="stat-value">89,400</div>
					<div class="stat-desc">21% more than last month</div>
				</div>
			</div>
		</div>
		<div>
			<h3 class="mb-6">Accent</h3>
			<div class="stats shadow bg-accent text-accent-content">
				<div class="stat">
					<div class="stat-title">Total Page Views</div>
					<div class="stat-value">89,400</div>
					<div class="stat-desc">21% more than last month</div>
				</div>
			</div>
		</div>
	</div>
</div>




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
