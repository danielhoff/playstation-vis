<script lang="ts">
    import { getTheme, toggleTheme } from "$lib/stores/theme.svelte";

    let hover:boolean = $state(false);
    let cancelAnimation:boolean = $state(false);

    const onMouseEnter = () => {
        hover = true;
    }

    const onMouseLeave = () => {
        hover = false;
        cancelAnimation = false;
    }

    const handleClick = (event: MouseEvent) => {
        cancelAnimation = true;
        toggleTheme();
    }
</script>

<button aria-label="toggle theme" onclick={handleClick} onmouseenter="{onMouseEnter}" onmouseleave="{onMouseLeave}" class:button-hover={hover && !cancelAnimation} class="
    relative
    overflow-hidden
    cursor-pointer
    w-[50px] h-[50px]
    rounded-full
    shadow-(--box-shadow-primary)
    hover:shadow-(--box-shadow-primary-hover)
    bg-(--color-primary)
    hover:scale-105
    transition-all
    duration-300
    ease-in-out">
        <i
            class="icon-light absolute top-[50%] left-[50%] inline-block w-[30px] h-[30px] bg-center bg-no-repeat bg-[url(/src/lib/assets/light.svg)]"
            class:light-exit={hover && getTheme() === 'light' && !cancelAnimation}
            class:light-enter={hover && getTheme() === 'dark' && !cancelAnimation}
            class:active={getTheme() === 'light'}
            class:inactive={getTheme() === 'dark'}>
        </i>
        <i
            class="icon-dark inactive absolute top-[50%] left-[50%] w-[30px] h-[30px] bg-center bg-no-repeat bg-[url(/src/lib/assets/dark.svg)]"
            class:dark-enter={hover && getTheme() === 'light' && !cancelAnimation}
            class:dark-exit={hover && getTheme() === 'dark' && !cancelAnimation}
            class:active={getTheme() === 'dark'}
            class:inactive={getTheme() === 'light'}>
        </i>
</button>

<style>
    /* cant use tailwind for active/inactive. for some reason it messes up the animation below */
    .active {
        transform: translate(-50%, -50%);
    }
    .inactive {
        transform: translate(-50%, 125%);
    }

    .inactive.icon-light {
        background-image: url('/src/lib/assets/light-inactive.svg');
    }

    @keyframes light-exit {
        0%   { transform: translate(-50%, -50%) rotate(0deg); }
        50%  { transform: translate(-50%, -50%) rotate(360deg); }
        75%  { transform: translate(-50%, 75%) rotate(180deg); }
        100% { transform: translate(-50%, 125%); }
    }

    @keyframes dark-enter {
        0%   { transform: translate(-50%, 125%); }
        100% { transform: translate(-50%, -50%); }
    }

    @keyframes button-hover {
        0% { background-color: var(--color-primary)}
        100% { background-color: var(--color-primary-hover)}
    }

    .button-hover {
        animation: button-hover 0.5s ease-out forwards;
        animation-delay: 1.6s
    }

    .light-exit {
        animation: light-exit 2s ease-in-out forwards;
    }

    .light-enter {
        animation: light-exit 2s ease-in-out forwards;
        animation-direction: reverse;
        animation-delay: 0.2s;
    }

    .dark-enter {
        animation: dark-enter 0.7s ease-in-out forwards;
        animation-delay: 1.6s;
    }

    .dark-exit {
        animation: dark-enter 0.7s ease-in-out forwards;
        animation-direction: reverse;
    }
</style>