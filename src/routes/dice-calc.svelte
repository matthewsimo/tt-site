<script lang="ts">
	type Rule = 'GreaterThan' | 'EqualTo' | 'LessThan' | 'GreaterThanInclusive' | 'LessThanInclusive';

	type Roll = {
		rule: Rule;
		value: number;
	};

	type Sequence = {
		diceType: 'D6' | 'D3';
		diceNumber: number;
		rolls: Roll[];
	};

	let sequence: Sequence = {
		diceType: 'D6',
		diceNumber: 1,
		rolls: [
			{ rule: 'GreaterThanInclusive', value: 3 },
			{ rule: 'GreaterThanInclusive', value: 3 },
			{ rule: 'LessThan', value: 5 }
		]
	};

	$: workingSet = sequence.diceType === 'D6' ? new Set([1, 2, 3, 4, 5, 6]) : new Set([1, 2, 3]);

	const handleAddRoll = () => {
		const newSequence = sequence;
		newSequence.rolls.push({ rule: 'GreaterThanInclusive', value: 3 });
		sequence = newSequence;
	};

	const handleRemoveRoll = (i: number) => {
		const newSequence = sequence;
		newSequence.rolls = sequence.rolls.slice(0, i).concat(sequence.rolls.slice(i + 1));
		sequence = newSequence;
	};

	const getRuleFilter = (rule: Rule): ((value: number, v: number) => boolean) => {
		switch (rule) {
			case 'EqualTo':
				return (value: number, v: number) => (value === v ? true : false);
			case 'GreaterThan':
				return (value: number, v: number) => (value > v ? true : false);
			case 'LessThan':
				return (value: number, v: number) => (value < v ? true : false);
			case 'GreaterThanInclusive':
				return (value: number, v: number) => (value >= v ? true : false);
			case 'LessThanInclusive':
				return (value: number, v: number) => (value <= v ? true : false);
		}
	};

	const getNum = (rule: Rule, value: number): number => {
		let potentialFaces = new Set();
		let ruleFilter = getRuleFilter(rule);

		workingSet.forEach((v) => {
			if (ruleFilter(v, value)) {
				potentialFaces.add(v);
			}
		});

		// console.log({ potentialFaces });
		return potentialFaces.size;
	};

	const getResults = (seq: Sequence) => {
		const denominator = seq.diceType === 'D6' ? 6 : 3;
		const val =
			seq.diceNumber *
			seq.rolls.reduce((pV, { rule, value }) => {
				const numerator = getNum(rule, value);
				return (pV * numerator) / denominator;
			}, 1);

		return val;
	};

	const getSegmentClass = (rule: Rule, value: number, i: number): string => {
		let ruleFilter = getRuleFilter(rule);
		return ruleFilter(i, value) ? 'text-success' : 'text-error';
	};

	$: results = getResults(sequence).toFixed(3);
</script>

<div class="mx-auto max-w-3xl mt-20">
	<div class="flex flex-row justify-between space-x-6">
		<div class="flex flex-col justify-between space-y-6 w-1/2">
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
								bind:value={sequence.diceNumber}
							/>
						</div>

						<select class="select select-bordered w-full max-w-xs" bind:value={sequence.diceType}>
							<option disabled selected value={undefined}>Dice Type</option>
							<option>D6</option>
							<option>D3</option>
						</select>
					</div>
				</div>
			</div>

			{#each sequence.rolls as roll, i}
				<div class="card w-96 shadow-xl bg-neutral text-neutral-content">
					<div class="card-body">
						<div class="card-title justify-between">
							<h2>Roll {i + 1}</h2>

							<div class="tooltip tooltip-top" data-tip="Remove">
								<button
									class="btn btn-xs btn-outline btn-accent btn-circle"
									on:click|preventDefault={() => handleRemoveRoll(i)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div class="card-actions justify-end">
							<select
								class="select select-bordered w-full max-w-xs"
								bind:value={sequence.rolls[i].rule}
							>
								<option value={undefined}>Rule</option>
								<option value={'GreaterThanInclusive'}>Greater Than (Inclusive)</option>
								<option value={'GreaterThan'}>Greater Than</option>
								<option value={'EqualTo'}>Equal To</option>
								<option value={'LessThan'}>Less Than</option>
								<option value={'LessThanInclusive'}>Less Than (Inclusive)</option>
							</select>

							<input
								type="range"
								min="1"
								max={sequence.diceType === 'D6' ? 6 : 3}
								class="range mt-4"
								step="1"
								bind:value={sequence.rolls[i].value}
							/>
							<div class="w-full flex justify-between text-xs px-2">
								{#if sequence.diceType === 'D6'}
									<span
										class={`${getSegmentClass(sequence.rolls[i].rule, sequence.rolls[i].value, 1)}`}
										>1</span
									>
									<span
										class={`${getSegmentClass(sequence.rolls[i].rule, sequence.rolls[i].value, 2)}`}
										>2</span
									>
									<span
										class={`${getSegmentClass(sequence.rolls[i].rule, sequence.rolls[i].value, 3)}`}
										>3</span
									>
									<span
										class={`${getSegmentClass(sequence.rolls[i].rule, sequence.rolls[i].value, 4)}`}
										>4</span
									>
									<span
										class={`${getSegmentClass(sequence.rolls[i].rule, sequence.rolls[i].value, 5)}`}
										>5</span
									>
									<span
										class={`${getSegmentClass(sequence.rolls[i].rule, sequence.rolls[i].value, 6)}`}
										>6</span
									>
								{:else}
									<span>1</span>
									<span>2</span>
									<span>3</span>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}

			<button
				class="btn btn-accent gap-2 max-w-[fit-content]"
				on:click|preventDefault={handleAddRoll}
			>
				Add a Roll
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="rotate-45 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
			</button>
		</div>

		<div class="flex flex-col">
			<p>Average passes: {results}</p>
		</div>
	</div>

	<div class="collapse mt-20 text-base-content">
		<input type="checkbox" class="peer" />
		<div class="collapse-title opacity-30">Debug</div>
		<div class="collapse-content space-y-6">
			<div>
				<pre>{JSON.stringify(sequence, null, 2)}</pre>
			</div>
		</div>
	</div>
</div>
