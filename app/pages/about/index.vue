<script setup lang="ts">
// Get about page image from Sanity (separate from homepage about section)
const { mainImage: aboutImage } = useSanityAbout()

useSeoMeta({
  title: 'About | Photography',
  description: 'Learn more about your photographer - my story, approach, and passion for capturing life\'s precious moments.',
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
      <div class="container-narrow text-center">
        <p class="text-accent text-lg md:text-xl mb-3">
          Nice to Meet You
        </p>
        <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
          About Me
        </h1>
        <p class="text-charcoal-600 max-w-xl mx-auto">
          The story behind the camera and the passion that drives every session.
        </p>
      </div>
    </section>

    <!-- About Content -->
    <section class="section-padding bg-cream-100">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <!-- Image -->
          <div v-if="aboutImage" class="relative">
            <div class="aspect-[4/5] overflow-hidden">
              <img
                :src="aboutImage"
                alt="Photographer portrait"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"></div>
          </div>

          <!-- Text -->
          <div class="lg:pl-8">
            <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-6">
              Hello, I'm Your Photographer
            </h2>
            
            <div class="space-y-4 text-charcoal-600 leading-relaxed">
              <p>
                Welcome! I'm a professional photographer based in Bratislava, specializing in 
                capturing life's most precious moments — from the anticipation of maternity to 
                the wonder of newborns and the joy of family connections.
              </p>
              <p>
                My journey into photography began over a decade ago when I picked up my first 
                camera and discovered the magic of freezing moments in time. Since then, I've 
                had the privilege of documenting hundreds of families, weddings, and life milestones.
              </p>
              <p>
                My approach is relaxed and natural. I believe the best photographs happen when 
                you forget the camera is there. Every session is tailored to your family's unique 
                story, creating images that will be treasured for generations.
              </p>
              <p>
                When I'm not behind the lens, you'll find me exploring new locations for shoots, 
                spending time with my own family, or editing in my cozy home studio with a 
                cup of coffee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My Approach -->
    <section class="section-padding bg-cream-200">
      <div class="container-narrow text-center">
        <p class="text-accent text-lg md:text-xl mb-3">
          My Philosophy
        </p>
        <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-8">
          What Makes My Work Special
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full">
              <img src="/svg/icons/heart.svg" alt="Authentic Moments" class="h-8 w-8" />
            </div>
            <h3 class="font-display text-xl text-charcoal-900 mb-2">Authentic Moments</h3>
            <p class="text-charcoal-600 text-sm">
              I focus on capturing real emotions and genuine connections, not forced poses.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full">
              <img src="/svg/icons/camera.svg" alt="Timeless Style" class="h-8 w-8" />
            </div>
            <h3 class="font-display text-xl text-charcoal-900 mb-2">Timeless Style</h3>
            <p class="text-charcoal-600 text-sm">
              Clean, elegant editing that will look beautiful for decades to come.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full">
              <img src="/svg/icons/clock.svg" alt="Relaxed Experience" class="h-8 w-8" />
            </div>
            <h3 class="font-display text-xl text-charcoal-900 mb-2">Relaxed Experience</h3>
            <p class="text-charcoal-600 text-sm">
              Sessions are designed to feel like a fun outing, not a stressful photoshoot.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-20 bg-charcoal-900">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-white mb-4">
          Let's Work Together
        </h2>
        <p class="text-cream-200 mb-8 max-w-xl mx-auto">
          I'd love to hear about your story and create something beautiful.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-block px-8 py-4 bg-warm-500 text-white text-sm tracking-wider uppercase hover:bg-warm-600 transition-colors"
        >
          Contact Me
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
