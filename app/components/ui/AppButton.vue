<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    to: undefined,
    href: undefined,
})

const classes = computed(() => {
    const base =
        'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-400 focus:ring-offset-2'

    const variants = {
        primary: 'bg-warm-500 text-white hover:bg-warm-600',
        outline:
            'border border-charcoal-700 text-charcoal-700 hover:bg-charcoal-900 hover:text-white hover:border-charcoal-900',
        ghost: 'text-charcoal-700 hover:text-warm-500 underline-offset-4 hover:underline',
    }

    const sizes = {
        sm: 'px-4 py-2 text-xs 3xl:px-5 3xl:py-2.5 3xl:text-sm 4xl:px-6 4xl:py-3 4xl:text-base',
        md: 'px-6 py-3 text-sm 3xl:px-8 3xl:py-4 3xl:text-base 4xl:px-10 4xl:py-5 4xl:text-lg',
        lg: 'px-8 py-4 text-sm 3xl:px-10 3xl:py-5 3xl:text-base 4xl:px-12 4xl:py-6 4xl:text-lg',
    }

    return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})

const isExternal = computed(() => props.href?.startsWith('http'))
</script>

<template>
    <NuxtLink v-if="to" :to="to" :class="classes">
        <slot />
    </NuxtLink>
    <a
        v-else-if="href"
        :href="href"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noopener noreferrer' : undefined"
        :class="classes"
    >
        <slot />
    </a>
    <button v-else :type="type" :class="classes">
        <slot />
    </button>
</template>
