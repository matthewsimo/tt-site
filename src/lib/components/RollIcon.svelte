<script lang="ts">
	import type { Role } from '$lib/parseRoster';
	import type { SvelteComponent } from 'svelte';
	import ElitesIcon from './RollIcons/elites-icon.svelte';
	import FastIcon from './RollIcons/fast-icon.svelte';
	import FlyerIcon from './RollIcons/flyer-icon.svelte';
	import FortificationIcon from './RollIcons/fortification-icon.svelte';
	import HeavyIcon from './RollIcons/heavy-icon.svelte';
	import HqIcon from './RollIcons/hq-icon.svelte';
	import LowIcon from './RollIcons/low-icon.svelte';
	import TransportIcon from './RollIcons/transport-icon.svelte';
	import TroopsIcon from './RollIcons/troops-icon.svelte';

	export let role: string;
	export let size: number = 20;

	const iconMap: Record<string, typeof SvelteComponent> = {
		HQ: HqIcon,
		Troops: TroopsIcon,
		Elites: ElitesIcon,
		'Fast Attack': FastIcon,
		Flyer: FlyerIcon,
		'Heavy Support': HeavyIcon,
		Fortification: FortificationIcon,
		'Lord of War': LowIcon,
		'Dedicated Transport': TransportIcon
	};
</script>

<svelte:component this={iconMap[role]} {size} />
