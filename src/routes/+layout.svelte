<script lang="ts">
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1 class="font-space-mono text-ps-blue">This appears on all pages</h1>

{@render children?.()}
