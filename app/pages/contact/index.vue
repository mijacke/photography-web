<script setup lang="ts">
useSeoMeta({
  title: 'Contact | Photography',
  description: 'Get in touch to book your photography session. Family, newborn, maternity, and wedding photography in Bratislava and beyond.',
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
      <div class="container-narrow text-center">
        <p class="text-accent text-lg md:text-xl mb-3">
          Get in Touch
        </p>
        <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
          Let's Connect
        </h1>
        <p class="text-charcoal-600 max-w-xl mx-auto">
          I'd love to hear from you! Whether you're ready to book a session 
          or just have questions, feel free to reach out.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding bg-cream-100">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          <!-- Contact Form -->
          <div>
            <h2 class="font-display text-2xl text-charcoal-900 mb-6">
              Send a Message
            </h2>
            <SectionsContactContactForm />
          </div>

          <!-- Contact Info -->
          <div class="lg:pl-8">
            <h2 class="font-display text-2xl text-charcoal-900 mb-6">
              Contact Information
            </h2>
            
            <div class="space-y-8">
              <!-- Email -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-warm-400/10 flex items-center justify-center">
                  <img src="/svg/icons/mail.svg" alt="Email" class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="font-medium text-charcoal-900 mb-1">Email</h3>
                  <a href="mailto:hello@example.com" class="text-charcoal-600 hover:text-warm-500 transition-colors">
                    hello@example.com
                  </a>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-warm-400/10 flex items-center justify-center">
                  <img src="/svg/icons/phone.svg" alt="Phone" class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="font-medium text-charcoal-900 mb-1">Phone</h3>
                  <a href="tel:+421900000000" class="text-charcoal-600 hover:text-warm-500 transition-colors">
                    +421 900 000 000
                  </a>
                </div>
              </div>

              <!-- Location -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-warm-400/10 flex items-center justify-center">
                  <img src="/svg/icons/location.svg" alt="Location" class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="font-medium text-charcoal-900 mb-1">Location</h3>
                  <p class="text-charcoal-600">
                    Bratislava, Slovakia<br />
                    <span class="text-sm">Available for travel worldwide</span>
                  </p>
                </div>
              </div>

              <!-- Response Time -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-warm-400/10 flex items-center justify-center">
                  <img src="/svg/icons/clock.svg" alt="Response Time" class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="font-medium text-charcoal-900 mb-1">Response Time</h3>
                  <p class="text-charcoal-600">
                    I typically respond within 24-48 hours
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-10 pt-8 border-t border-cream-300">
              <h3 class="font-medium text-charcoal-900 mb-4">Follow Along</h3>
              <div class="flex gap-4">
                <a 
                  href="https://www.instagram.com/paulifotografka/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-charcoal-900 text-white flex items-center justify-center hover:bg-warm-500 transition-colors"
                  aria-label="Instagram"
                >
                  <img src="/svg/icons/instagram.svg" alt="Instagram" class="h-5 w-5 invert" />
                </a>
                <a 
                  href="https://www.facebook.com/paulifotografka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-charcoal-900 text-white flex items-center justify-center hover:bg-warm-500 transition-colors"
                  aria-label="Facebook"
                >
                  <img src="/svg/icons/facebook.svg" alt="Facebook" class="h-5 w-5 invert" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
