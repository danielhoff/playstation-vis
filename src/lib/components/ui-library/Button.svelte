<script lang="ts">

    interface Props {
        label?: string;
        type?: 'primary' | 'secondary' | 'warning';
        size?: 'sm' | 'md' | 'lg';
        icon?: string;
        onClick?: (event: MouseEvent) => void;
    }

    let {
        label = '',
        type = 'primary',
        size = 'md',
        onClick
    }: Props = $props();


    // map size prop to Tailwind classes
    const sizeVariants:Record<NonNullable<Props['size']>, string> = {
        sm: 'p-(--btn-sm)',
        md: 'p-(--btn-md)',
        lg: 'p-(--btn-lg)',
    };

    const sizeVarientsCopy:Record<NonNullable<Props['size']>, string> = {
        sm: 'text-(length:--btn-text-sm)',
        md: 'text-(length:--btn-text-md)',
        lg: 'text-(length:--btn-text-lg)',
    }

    // map type classes for the button
    const typeVariantsBtn:Record<NonNullable<Props['type']>, string> = {
        primary: 'bg-(--color-primary) group-hover:bg-(--color-primary-hover) group-hover:bg-[url(/src/lib/assets/cross.svg)]',
        secondary: 'bg-(--color-secondary) group-hover:bg-(--color-secondary-hover) group-hover:bg-[url(/src/lib/assets/triangle.svg)]',
        warning: 'bg-(--color-warning) group-hover:bg-(--color-warning-hover) group-hover:bg-[url(/src/lib/assets/circle.svg)]',
    }

    const typeVariantsCopy:Record<NonNullable<Props['type']>, string> = {
        primary: 'text-(--font-color-light) group-hover:text-(--font-color-light-hover)',
        secondary: 'text-(--font-color-dark) group-hover:text-(--font-color-dark-hover)',
        warning: 'text-(--font-color-light) group-hover:text-(--font-color-light-hover)',
    }

</script>

<div class="group inline-block">
    <button
        onclick={onClick}
        class="{`
            cursor-pointer
            rounded-md
            ${sizeVariants[size]}
            ${typeVariantsBtn[type]}
            bg-size-[5px_5px]
            shadow-(--box-shadow-primary)
            hover:shadow-(--box-shadow-primary-hover)
            transition-all
            ease-out
            duration-300`
        }">
        <span class="{`${sizeVarientsCopy[size]} ${typeVariantsCopy[type]}`}">{label}</span>
    </button>
</div>
