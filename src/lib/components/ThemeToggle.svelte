<script lang="ts">
    interface Props {
        theme: 'light' | 'dark';
        onClick?: (event: MouseEvent) => void;
    }

    let {
        theme = 'light',
        onClick
    }: Props = $props();

    let hover:boolean = $state(false);
</script>

<button onmouseenter="{() => hover = true}" onmouseleave="{() => hover = false}" class:button-hover={hover} class="
    relative
    overflow-hidden
    cursor-pointer
    w-[50px] h-[50px]
    rounded-full
    bg-(--color-primary)
    shadow-[0_6px_12px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)] 
    hover:shadow-[0_10px_20px_rgba(0,0,0,0.35),0_4px_8px_rgba(0,0,0,0.25)] 
    
    hover:scale-105
    transition-all
    duration-300
    ease-in-out">
    <!-- hover:bg-(--color-primary-hover) -->
        <i class="icon-light absolute top-[50%] left-[50%] -translate-1/2 inline-block w-[30px] h-[30px] bg-center bg-no-repeat bg-[url(/src/lib/assets/light.svg)]" class:light-exit={hover}></i>
        <i class="icon-dark absolute top-[50%] left-[50%] w-[30px] h-[30px] bg-center bg-no-repeat bg-[url(/src/lib/assets/dark.svg)]" class:dark-enter={hover}></i>
</button>

<style>
    .icon-dark {
        /* cant use tailwind for this. for reason it messes up the animation below */
        transform: translate(-50%, 125%);
    }

    @keyframes light-exit {
        0%   { transform: rotate(0deg); }
        50%  { transform: rotate(360deg); }
        75%  { transform: rotate(180deg); }
        100% { transform: translateY(125%); }
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
        animation: button-hover 0.4s ease-out forwards;
        animation-delay: 1.6s
    }

    .light-exit {
        animation: light-exit 2s ease-in-out forwards;
    }

    .dark-enter {
        animation: dark-enter 1s ease-in-out forwards;
        animation-delay: 1.8s;
    }
</style>