<script lang="ts">
	import jszip from 'jszip';
	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import parseRoster from '$lib/parseRoster';
	import type { Roster } from '$lib/parseRoster';
	import RosterPreview from '$lib/components/RosterPreview.svelte';

	let processing: boolean = false;
	let rawFile: File | undefined;
	let roster: Roster | undefined;
	let list: Document | undefined;
	let errors: string | undefined;

	const handleFile = async (e: Event): Promise<void> => {
		errors = undefined;
		list = undefined;
		roster = undefined;
		const { files } = <HTMLInputElement>e.target;
		// console.log('handleFile:', { jszip, e, files, file: files[0] });

		if (files && files[0]) {
			rawFile = files[0];
			// window.rawFile = files[0];
			const fileReader = new FileReader();
			fileReader.onerror = () => {
				fileReader.abort();
				errors = 'Error reading file.';
			};
			fileReader.onloadend = async () => {
				const parser = new DOMParser();
				let content = <string>fileReader.result;

				if (!content.startsWith('<?xml')) {
					const zipFile = await jszip.loadAsync(files[0]);
					content = await zipFile.file(/[^/]+\.ros/)[0].async('string');
				}
				list = parser.parseFromString(content, 'text/xml');
				roster = parseRoster(list);
				// console.log({ list, json: xmlToJson(list), roster: parseRoster(list) });
				// window.parsedFile = list;
				// window.roster = roster;
			};

			fileReader.readAsBinaryString(files[0]);
		}
	};

	const handleSubmit = async (e: Event): Promise<void> => {
		processing = true;

		if (!rawFile) {
			errors = 'Raw file not found';
			processing = false;
			return;
		}

		if (!roster) {
			errors = 'You need a roster to submit';
			processing = false;
			return;
		}

		console.log({ e, roster, rawFile });

		const now = Date.now();
		const filePath = `${now}-${rawFile.name}`;

		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('raw-rosters')
			.upload(filePath, rawFile);

		console.log({ uploadData, uploadError });

		if (uploadError) {
			errors = `Error uploading raw roster to storage`;
			console.log({ uploadError });
			processing = false;
			return;
		}

		const { data, error } = await supabase.from('rosters').insert({
			roster,
			filePath
		});

		console.log({ data, error });

		if (error) {
			errors = `Error saving parsed roster`;
			console.log({ error });
			processing = false;
			return;
		}

		goto(`/roster/${data[0].uuid}`);
	};
</script>

<div class="py-10">
	{#if errors}
		<div class="alert alert-error shadow-lg my-10">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Error! {errors}</span>
			</div>
		</div>
	{/if}
	<h1 class="text-5xl text-center pb-10">40k Tabletop Tools</h1>
	<ul class="text-center text-lg list-inside pb-10 list-decimal mx-auto max-w-lg">
		<li class="list-item">pretty print your battlescribe rosters</li>
		<li class="list-item">upload, link, and share your rosters</li>
	</ul>

	<form
		class="mx-auto max-w-md mt-5"
		method="post"
		enctype="multipart/form-data"
		on:submit|preventDefault={handleSubmit}
	>
		<div
			class="form-control w-full m-0 p-1.5 text-neutral-content font-normal bg-neutral rounded bg-clip-padding border transition ease-in-out focus:text-base focus:bg-neutral focus:border-primary-focus focus:outline-none"
		>
			<input
				class="cursor-pointer w-full"
				id="roster-file"
				name="roster-file"
				type="file"
				accept="text/xml,application/xml,application/zip,.ros,.rosz"
				on:change={handleFile}
			/>
		</div>
		<label class="block label cursor-pointer text-sm label-text italic p-2" for="roster-file"
			>Upload a .ros or .rosz file</label
		>

		{#if roster}
			<div class="mt-6">
				<p class="font-light italic text-info">
					If the preview below looks correct, click upload to save it!
				</p>
			</div>
		{/if}

		{#if processing}
			<button disabled class="btn btn-primary btn-sm mt-5 loading" type="submit">Upload</button>
		{:else}
			<button disabled={!roster} class="btn btn-primary btn-sm mt-5" type="submit">Upload</button>
		{/if}
	</form>
</div>

{#if Boolean(roster)}
	<div class="mx-auto max-w-5xl my-5">
		{#if roster}
			<RosterPreview {roster} />
		{/if}
	</div>
{/if}

<style>
	input[type='file']::file-selector-button {
		cursor: pointer;
	}
</style>
