<script setup lang="ts">
// Get portfolio images from Sanity to use for services
const { portfolioImages } = useSanityHomepage()

useSeoMeta({
  title: 'Services | Photography',
  description: 'Professional photography services for families, newborns, maternity, and weddings. Based in Bratislava, available worldwide.',
})

const services = computed(() => [
  {
    id: 'family',
    title: 'Family Sessions',
    description: 'Capturing the love and connection between family members in natural, relaxed settings. Perfect for annual family portraits, milestone celebrations, or just because.',
    features: [
      '1-2 hour session',
      'Outdoor or in-home options',
      '30+ edited digital images',
      'Print-ready high resolution files',
      'Online gallery for easy sharing',
    ],
    image: portfolioImages.value.rodina || '',
  },
  {
    id: 'newborn',
    title: 'Newborn Photography',
    description: 'Delicate portraits of your newest family member in their first precious days. Best scheduled within the first 2 weeks of life when babies are sleepiest.',
    features: [
      '2-3 hour session',
      'In-home or studio setting',
      '25+ edited digital images',
      'Parent and sibling photos included',
      'Wraps and props provided',
    ],
    image: portfolioImages.value.novorodenci || '',
  },
  {
    id: 'maternity',
    title: 'Maternity Photography',
    description: 'Celebrating the beauty of pregnancy and the anticipation of new life. Best scheduled between 28-34 weeks.',
    features: [
      '1 hour session',
      'Outdoor or studio options',
      '20+ edited digital images',
      'Partner photos included',
      'Styling guidance provided',
    ],
    image: portfolioImages.value.tehotenstvo || '',
  },
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Documenting your special day with timeless elegance and authentic emotion. From intimate elopements to grand celebrations.',
    features: [
      'Full day coverage available',
      'Second photographer option',
      '300+ edited digital images',
      'Engagement session included',
      'Premium album options',
    ],
    image: portfolioImages.value.svadby || '',
  },
])
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
      <div class="container-narrow text-center">
        <p class="text-accent text-lg md:text-xl mb-3">
          What I Offer
        </p>
        <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
          Photography Services
        </h1>
        <p class="text-charcoal-600 max-w-xl mx-auto">
          Every session is carefully crafted to capture your unique story. 
          Choose the style that fits your needs.
        </p>
      </div>
    </section>

    <!-- Services List -->
    <section class="bg-cream-100">
      <div 
        v-for="(service, index) in services" 
        :key="service.id"
        :id="service.id"
        class="section-padding border-b border-cream-200 last:border-b-0"
      >
        <div class="container-wide">
          <div 
            :class="[
              'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            ]"
          >
            <!-- Image -->
            <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
              <div class="aspect-[4/3] overflow-hidden">
                <NuxtImg
                  :src="service.image"
                  :alt="service.title"
                  class="w-full h-full object-cover"
                  width="600"
                  height="450"
                  format="webp"
                  quality="85"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Content -->
            <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
              <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-4">
                {{ service.title }}
              </h2>
              
              <p class="text-charcoal-600 leading-relaxed mb-6">
                {{ service.description }}
              </p>
              
              <h3 class="font-sans text-sm font-semibold uppercase tracking-wider text-charcoal-800 mb-4">
                What's Included
              </h3>
              
              <ul class="space-y-2 mb-8">
                <li 
                  v-for="feature in service.features" 
                  :key="feature"
                  class="flex items-start gap-3 text-charcoal-600"
                >
                  <img src="/svg/icons/check.svg" alt="" class="h-5 w-5 flex-shrink-0 mt-0.5" />
                  {{ feature }}
                </li>
              </ul>
              
              <UiAppButton to="/contact" variant="primary">
                Inquire About {{ service.title }}
              </UiAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-cream-200">
      <div class="container-narrow">
        <div class="text-center mb-12">
          <p class="text-accent text-lg md:text-xl mb-3">
            Common Questions
          </p>
          <h2 class="text-3xl md:text-4xl font-display text-charcoal-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div class="space-y-6">
          <details class="group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              How far in advance should I book?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              I recommend booking 4-6 weeks in advance for family and maternity sessions, 
              2-3 months for newborn sessions (before baby arrives!), and 6-12 months for weddings.
            </p>
          </details>

          <details class="group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              What should we wear?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              I provide a detailed style guide upon booking! Generally, I recommend coordinating 
              (not matching) outfits in soft, neutral colors that complement each other.
            </p>
          </details>

          <details class="group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              Where do sessions take place?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              I offer both outdoor and indoor sessions. I have beautiful location recommendations 
              around Bratislava, but I'm also happy to come to your home or a meaningful location of your choice.
            </p>
          </details>

          <details class="group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              When will we receive our photos?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              You'll receive your online gallery within 2-3 weeks for portrait sessions and 
              4-6 weeks for weddings. I'll send sneak peeks within 48 hours!
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-20 bg-charcoal-900">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-white mb-4">
          Ready to Book?
        </h2>
        <p class="text-cream-200 mb-8 max-w-xl mx-auto">
          Let's create beautiful memories together.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-block px-8 py-4 bg-warm-500 text-white text-sm tracking-wider uppercase hover:bg-warm-600 transition-colors"
        >
          Get in Touch
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
