<script lang="ts">
    interface Props {
        label?: string;
        type?: 'primary' | 'secondary' | 'warning'
        size?: 'circ' | 'sm' | 'md' | 'lg'
    }

    let {
        label = '',
        type = 'primary',
        size = 'md',
    }: Props = $props();

    // map size prop to Tailwind classes
    const sizeVariants:object = {
        sm: 'p-(--btn-sm) text-(--btn-text-sm)',
        md: 'p-(--btn-md) text-(--btn-text-md)',
        lg: 'p-(--btn-lg) text-(--btn-text-lg)',
        circ: 'rounded-md'
    };

    const sizeVarientsCopy:object = {
        sm: 'text-(length:--btn-text-sm)',
        md: 'text-(length:--btn-text-md)',
        lg: 'text-(length:--btn-text-lg)',
        circ: ''
    }

    // map type classes for the button
    const typeVariantsBtn:object = {
        primary: 'bg-(--color-primary) group-hover:bg-(--color-primary-hover)',
        secondary: 'bg-(--color-secondary) group-hover:bg-(--color-secondary-hover)',
        warning: 'bg-(--color-warning) group-hover:bg-(--color-warning-hover)',
    }

    const typeVariantsCopy:object = {
        primary: 'text-(--font-color-light) group-hover:text-(--font-color-light-hover)',
        secondary: 'text-(--font-color-dark) group-hover:text-(--font-color-dark-hover)',
        warning: 'text-(--font-color-light) group-hover:text-(--font-color-light-hover)',
    }

</script>

<div class="group inline-block">
    <button class="{`cursor-pointer rounded-sm ${sizeVariants[size]} ${typeVariantsBtn[type]}`}">
        <span class="{`${sizeVarientsCopy[size]} ${typeVariantsCopy[type]}`}">{label}</span>
    </button>
</div>
