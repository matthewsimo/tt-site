<script lang="ts" context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }: { error: { message: string }; status: string }) {
		return {
			props: {
				error,
				status
			}
		};
	}
</script>

<script lang="ts">
	export let error: { message: string };
	export let status: string;
</script>

<div class="mx-auto max-w-5xl my-20">
	<h1 class="text-8xl font-black text-center">{status}</h1>
	<h3 class="text-4xl font-normal text-center">{error.message}</h3>
</div>
