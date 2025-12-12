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
})

const eventTypes = [
  'Family Session',
  'Newborn Photography',
  'Maternity Photography',
  'Wedding Photography',
  'Engagement Session',
  'Other',
]

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In real app, you would send to an API endpoint:
    // await $fetch('/api/contact', { method: 'POST', body: form })
    
    isSubmitted.value = true
    
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      message: '',
    })
  } catch (error) {
    errorMessage.value = 'Something went wrong. Please try again or email us directly.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div :class="$props.class">
    <!-- Success Message -->
    <div v-if="isSubmitted" class="text-center py-12">
      <div class="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-warm-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="font-display text-2xl text-charcoal-900 mb-3">
        Thank You!
      </h3>
      <p class="text-charcoal-600 mb-6">
        Your message has been sent. I'll get back to you within 24-48 hours.
      </p>
      <button 
        @click="isSubmitted = false" 
        class="text-warm-500 hover:text-warm-600 underline underline-offset-4"
      >
        Send another message
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name & Email Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-charcoal-700 mb-2">
            Name *
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 bg-white border border-cream-300 text-charcoal-900 placeholder-charcoal-400 focus:border-warm-400 focus:ring-1 focus:ring-warm-400 outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-charcoal-700 mb-2">
            Email *
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-white border border-cream-300 text-charcoal-900 placeholder-charcoal-400 focus:border-warm-400 focus:ring-1 focus:ring-warm-400 outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-charcoal-700 mb-2">
          Phone
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="w-full px-4 py-3 bg-white border border-cream-300 text-charcoal-900 placeholder-charcoal-400 focus:border-warm-400 focus:ring-1 focus:ring-warm-400 outline-none transition-colors"
          placeholder="+421 ..."
        />
      </div>

      <!-- Event Type & Date Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="eventType" class="block text-sm font-medium text-charcoal-700 mb-2">
            Session Type
          </label>
          <select
            id="eventType"
            v-model="form.eventType"
            class="w-full px-4 py-3 bg-white border border-cream-300 text-charcoal-900 focus:border-warm-400 focus:ring-1 focus:ring-warm-400 outline-none transition-colors"
          >
            <option value="">Select a session type</option>
            <option v-for="type in eventTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div>
          <label for="eventDate" class="block text-sm font-medium text-charcoal-700 mb-2">
            Preferred Date
          </label>
          <input
            id="eventDate"
            v-model="form.eventDate"
            type="date"
            class="w-full px-4 py-3 bg-white border border-cream-300 text-charcoal-900 focus:border-warm-400 focus:ring-1 focus:ring-warm-400 outline-none transition-colors"
          />
        </div>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium text-charcoal-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="5"
          class="w-full px-4 py-3 bg-white border border-cream-300 text-charcoal-900 placeholder-charcoal-400 focus:border-warm-400 focus:ring-1 focus:ring-warm-400 outline-none transition-colors resize-none"
          placeholder="Tell me about what you're looking for..."
        ></textarea>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="text-red-600 text-sm">
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full md:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
          <span v-else>Send Message</span>
        </button>
      </div>
    </form>
  </div>
</template>
