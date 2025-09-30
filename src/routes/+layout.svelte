<script lang="ts">
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { getTheme } from '$lib/stores/theme.svelte';
	import Background from '$lib/components/Background.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Background></Background>

<!-- class for light/dark modes goes here -->
<div class="{getTheme()} p-(--space-lg) h-dvh w-dvw">
	<div class="flex flex-row-reverse">
		<ThemeToggle></ThemeToggle>
	</div>

	{@render children?.()}
</div>
