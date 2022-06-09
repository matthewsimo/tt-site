<script>
	import PageFooter from '$lib/components/PageFooter.svelte';
import PageHeader from '$lib/components/PageHeader.svelte';

	import '../../../app.css';
</script>

<PageHeader />

<main class="w-full mx-auto px-6 max-w-7xl">
	<slot />
</main>

<PageFooter />