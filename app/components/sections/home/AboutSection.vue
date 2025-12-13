<script setup lang="ts">
// Get about image from Sanity
const { aboutImage } = useSanityHomepage()
</script>

<template>
  <section class="section-padding bg-cream-200">
    <div class="container-wide">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Image Side -->
        <div class="relative">
          <div class="aspect-[4/5] overflow-hidden">
            <!-- Show Sanity image if available -->
            <img
              v-if="aboutImage"
              :src="aboutImage"
              alt="Photographer portrait"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <!-- Loading skeleton -->
            <div v-else class="w-full h-full bg-cream-300 animate-pulse"></div>
          </div>
          <!-- Decorative frame -->
          <div class="absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"></div>
        </div>

        <!-- Text Side -->
        <div class="lg:pl-8">
          <p class="text-accent text-xl md:text-2xl mb-3">
            Ahoj, som
          </p>
          
          <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-6">
            Pauli Drahošová
          </h2>
          
          <div class="space-y-4 text-charcoal-600 leading-relaxed">
            <p>
              Vitajte! Som profesionálna fotografka so sídlom v Galante, špecializujem sa na 
              zachytávanie najcennejších okamihov života — od očakávania materstva cez 
              zázrak novorodencov až po radosť z rodinných stretnutí.
            </p>
            <p>
              Môj prístup je uvoľnený a prirodzený. Verím, že najlepšie fotografie vznikajú vtedy, 
              keď zabudnete, že je tam fotoaparát. Každé fotenie je prispôsobené jedinečnému 
              príbehu vašej rodiny a vytvára obrazy, ktoré budete uchovávať po generácie.
            </p>
            <p>
              Keď nie som za objektívom, nájdete ma pri objavovaní nových lokácií na fotenie, 
              trávení času s vlastnou rodinou alebo pri úpravách fotiek za počítačom s kávou v ruke.
            </p>
          </div>
          
          <div class="mt-8">
            <UiAppButton to="/about" variant="outline">
              Viac o mne
            </UiAppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
