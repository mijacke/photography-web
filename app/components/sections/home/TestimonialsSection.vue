<script setup lang="ts">
const testimonials = [
  {
    quote: "Spolupráca s touto fotografkou bola absolútny sen. Celá naša rodina sa cítila tak pohodlne a fotografie predčili všetky naše očakávania. Tieto spomienky si budeme vážiť navždy!",
    author: "Sára a Michal",
    occasion: "Rodinné fotenie"
  },
  {
    quote: "Bola som nervózna zo svojho tehotenského fotenia, ale od prvého momentu som sa cítila úplne v pohode. Fotky sú úžasné a krásne zachytávajú toto špeciálne obdobie.",
    author: "Emma",
    occasion: "Tehotenské fotenie"
  },
  {
    quote: "Novorodenecké fotky nášho malíčka sú absolútne úžasné. Taká trpezlivosť a starostlivosť bola venovaná získaniu dokonalých záberov. Vrelo odporúčame!",
    author: "Dávid a Lívia",
    occasion: "Novorodenecké fotenie"
  },
]

const activeIndex = ref(0)

const nextTestimonial = () => {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

const prevTestimonial = () => {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

// Auto-advance every 6 seconds
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(nextTestimonial, 6000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <section class="section-padding bg-warm-400/10">
    <div class="container-narrow">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <p class="text-accent text-lg md:text-xl mb-3">
          Milé slová od Vás
        </p>
        <h2 class="text-3xl md:text-4xl font-display text-charcoal-900">
          Čo hovoria klienti
        </h2>
      </div>

      <!-- Testimonial Carousel -->
      <div class="relative max-w-3xl mx-auto">
        <!-- Quote Icon -->
        <div class="text-center mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-10 w-10 text-warm-400 mx-auto"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
          </svg>
        </div>

        <!-- Testimonials -->
        <div class="relative overflow-hidden">
          <TransitionGroup
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-8"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-300 ease-in absolute w-full"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-8"
          >
            <div 
              v-for="(testimonial, index) in testimonials"
              v-show="index === activeIndex"
              :key="index"
              class="text-center"
            >
              <blockquote class="text-lg md:text-xl text-charcoal-700 leading-relaxed mb-8 font-light italic">
                "{{ testimonial.quote }}"
              </blockquote>
              <div>
                <p class="font-display text-charcoal-900 text-lg">
                  {{ testimonial.author }}
                </p>
                <p class="text-warm-500 text-sm">
                  {{ testimonial.occasion }}
                </p>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="activeIndex = index"
            :class="[
              'w-2 h-2 rounded-full transition-all duration-300',
              index === activeIndex ? 'bg-warm-500 w-6' : 'bg-warm-400/50 hover:bg-warm-400'
            ]"
            :aria-label="`Go to testimonial ${index + 1}`"
          />
        </div>

        <!-- Arrow Navigation -->
        <button
          @click="prevTestimonial"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden lg:block text-charcoal-400 hover:text-warm-500 transition-colors"
          aria-label="Previous testimonial"
        >
          <img src="/svg/icons/chevron-left.svg" alt="" class="h-8 w-8" />
        </button>
        <button
          @click="nextTestimonial"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden lg:block text-charcoal-400 hover:text-warm-500 transition-colors"
          aria-label="Next testimonial"
        >
          <img src="/svg/icons/chevron-right.svg" alt="" class="h-8 w-8" />
        </button>
      </div>
    </div>
  </section>
</template>
