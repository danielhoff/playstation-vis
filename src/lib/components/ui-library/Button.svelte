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
        sm: 'p-(--btn-sm) text-(--btn-text-sm)',
        md: 'p-(--btn-md) text-(--btn-text-md)',
        lg: 'p-(--btn-lg) text-(--btn-text-lg)',
    };

    const sizeVarientsCopy:Record<NonNullable<Props['size']>, string> = {
        sm: 'text-(length:--btn-text-sm)',
        md: 'text-(length:--btn-text-md)',
        lg: 'text-(length:--btn-text-lg)',
    }

    // map type classes for the button
    const typeVariantsBtn:Record<NonNullable<Props['type']>, string> = {
        primary: 'bg-(--color-primary) group-hover:bg-(--color-primary-hover)',
        secondary: 'bg-(--color-secondary) group-hover:bg-(--color-secondary-hover)',
        warning: 'bg-(--color-warning) group-hover:bg-(--color-warning-hover)',
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
            rounded-sm
            ${sizeVariants[size]}
            ${typeVariantsBtn[type]}
            shadow-(--box-shadow-primary)
            hover:shadow-(--box-shadow-primary-hover)`
        }">
        <span class="{`${sizeVarientsCopy[size]} ${typeVariantsCopy[type]}`}">{label}</span>
    </button>
</div>
