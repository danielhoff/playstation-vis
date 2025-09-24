<script lang="ts">
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Background from '$lib/components/Background.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();

	type Theme = 'light' | 'dark';

	let theme:Theme = $state('light');

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Background></Background>

<!-- Dark class goes here :) -->
<div class="{theme} p-(--space-lg) h-dvh w-dvw">
	<div class="flex flex-row-reverse">
		<ThemeToggle onClick={() => toggleTheme()} theme={theme}></ThemeToggle>
		<!-- <Button onClick={() => toggleTheme()} size="circ" icon="light"></Button> -->
	</div>

	{@render children?.()}
</div>
