<script lang="ts">
	import { page } from '$app/stores';

  $: isPage = (string: string) => $page.routeId?.endsWith(string);
</script>

<header class="navbar bg-neutral text-neutral-content mx-auto max-w-5xl my-10 px-3 py-2 flex flex-row justify-between items-center border border-base-300 shadow-lg rounded-lg">
	<h1><a  class="group btn btn-ghost normal-case text-xl rounded-md" href="/">40k tt <span class="relative text-sm -top-3 text-primary group-hover:text-primary-content">beta</span></a></h1>
		<ul class="menu menu-horizontal rounded-box p-1">
      <li class={`${ isPage('overview') && 'bordered'}`}><a href={`/roster/${$page.params.uuid}/overview`}>Overview</a></li>
      <li class={`${ isPage('details') && 'bordered'}`}><a href={`/roster/${$page.params.uuid}/details`}>Details</a></li>
    </ul>
</header>
