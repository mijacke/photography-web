<script setup lang="ts">
interface Props {
    class?: string
}

defineProps<Props>()

const form = reactive({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
    honeypot: '', // Bot trap - hidden field
})

const eventTypes = [
    'Rodinné fotenie',
    'Novorodenecké fotenie',
    'Tehotenské fotenie',
    'Svadobné fotenie',
    'Zásnubné fotenie',
    'Iné',
]

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
    isSubmitting.value = true
    errorMessage.value = ''

    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: {
                name: form.name,
                email: form.email,
                phone: form.phone || undefined,
                service: form.eventType || undefined,
                date: form.eventDate || undefined,
                message: form.message,
                honeypot: form.honeypot,
            },
        })

        isSubmitted.value = true

        Object.assign(form, {
            name: '',
            email: '',
            phone: '',
            eventType: '',
            eventDate: '',
            message: '',
            honeypot: '',
        })
    } catch (err: unknown) {
        const error = err as { data?: { message?: string } }
        errorMessage.value =
            error.data?.message ||
            'Niečo sa pokazilo. Skúste to znova alebo mi napíšte priamo na email.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div :class="$props.class">
        <div v-if="isSubmitted" class="text-center py-12">
            <div class="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 text-warm-500 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h3 class="font-display text-2xl text-charcoal-900 mb-3">Ďakujem!</h3>
            <p class="text-charcoal-600 mb-6">
                Vaša správa bola odoslaná. Ozvem sa vám čo najskôr!
            </p>
            <button
                class="text-warm-500 hover:text-warm-600 underline underline-offset-4"
                @click="isSubmitted = false"
            >
                Poslať ďalšiu správu
            </button>
        </div>

        <form v-else class="space-y-8" @submit.prevent="handleSubmit">
            <!-- Honeypot field - hidden from users, bots fill it -->
            <input
                v-model="form.honeypot"
                type="text"
                name="website"
                autocomplete="off"
                tabindex="-1"
                class="absolute -left-[9999px] opacity-0 h-0 w-0"
            >

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label
                        for="name"
                        class="block text-xs font-medium text-charcoal-500 tracking-wider uppercase mb-3"
                    >
                        Meno *
                    </label>
                    <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        class="w-full px-0 py-5 bg-transparent border-b border-cream-200 text-charcoal-900 placeholder-charcoal-400/50 focus:border-warm-400 focus:outline-none transition-all duration-300"
                        placeholder="Vaše meno"
                    />
                </div>
                <div>
                    <label
                        for="email"
                        class="block text-xs font-medium text-charcoal-500 tracking-wider uppercase mb-3"
                    >
                        Email *
                    </label>
                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        class="w-full px-0 py-5 bg-transparent border-b border-cream-200 text-charcoal-900 placeholder-charcoal-400/50 focus:border-warm-400 focus:outline-none transition-all duration-300"
                        placeholder="vas@email.sk"
                    />
                </div>
            </div>

            <div>
                <label
                    for="phone"
                    class="block text-xs font-medium text-charcoal-500 tracking-wider uppercase mb-3"
                >
                    Telefón
                </label>
                <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-0 py-5 bg-transparent border-b border-cream-200 text-charcoal-900 placeholder-charcoal-400/50 focus:border-warm-400 focus:outline-none transition-all duration-300"
                    placeholder="+421 ..."
                />
            </div>

            <div class="grid grid-cols-1 gap-8">
                <div>
                    <label
                        for="eventType"
                        class="block text-xs font-medium text-charcoal-500 tracking-wider uppercase mb-3"
                    >
                        Typ fotenia *
                    </label>
                    <select
                        id="eventType"
                        v-model="form.eventType"
                        required
                        class="w-full px-0 py-5 bg-transparent border-b border-cream-200 text-charcoal-900 focus:border-warm-400 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Vyberte typ fotenia</option>
                        <option v-for="type in eventTypes" :key="type" :value="type">
                            {{ type }}
                        </option>
                    </select>
                </div>
                <div>
                    <label
                        for="eventDate"
                        class="block text-xs font-medium text-charcoal-500 tracking-wider uppercase mb-3"
                    >
                        Preferovaný dátum
                    </label>
                    <input
                        id="eventDate"
                        v-model="form.eventDate"
                        type="date"
                        class="w-full px-0 py-5 bg-transparent border-b border-cream-200 text-charcoal-900 focus:border-warm-400 focus:outline-none transition-all duration-300"
                    />
                </div>
            </div>

            <div>
                <label
                    for="message"
                    class="block text-xs font-medium text-charcoal-500 tracking-wider uppercase mb-3"
                >
                    Správa *
                </label>
                <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="4"
                    class="w-full px-0 py-5 bg-transparent border-b border-cream-200 text-charcoal-900 placeholder-charcoal-400/50 focus:border-warm-400 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Povedzte mi o vašom príbehu..."
                />
            </div>

            <div v-if="errorMessage" class="text-red-600 text-sm">
                {{ errorMessage }}
            </div>

            <div class="pt-4">
                <UiAppButton
                    type="submit"
                    variant="outline"
                    size="lg"
                    :disabled="isSubmitting"
                    class="w-full md:w-auto"
                >
                    <span v-if="isSubmitting" class="flex items-center gap-2">
                        <svg
                            class="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            />
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Odosielam...
                    </span>
                    <span v-else>Odoslať správu</span>
                </UiAppButton>
            </div>
        </form>
    </div>
</template>
