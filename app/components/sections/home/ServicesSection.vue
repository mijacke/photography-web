<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="container-wide max-w-5xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-sm md:text-base tracking-[0.3em] uppercase text-charcoal-700">
          Fotografické služby, ktoré ponúkam
        </h2>
      </div>

      <!-- Text Content -->
      <div class="space-y-8 text-center text-charcoal-600 leading-relaxed">
        <p>
          Každá etapa rodinného života nesie svoj vlastný príbeh – od tichého očakávania počas tehotenstva až po teplo a blízkosť, ktoré s rokmi ešte viac rastú. Je pre mňa veľkou cťou, keď mi rodiny dovolia vstúpiť do ich sveta – či už u nich doma, vonku v prírode alebo na inom mieste, ktoré je im blízke – a môžem pre nich zachytiť tieto výnimočné momenty.
        </p>
        
        <p>
          Fotím tehotenské portréty, ktoré oslavujú krásu a silu materstva, novorodenecké fotografie plné tých najjemnejších prvých detailov, svadobné príbehy nabité emóciami a láskou, aj rodinné fotenia, ktoré zachytávajú vaše skutočné spojenie – prirodzene, úprimne a s dôrazom na emóciu.
        </p>
        
        <p>
          Každé fotenie je jednoduché, nadčasové a sústredené na skutočné chvíle. Žiadne ťažké rekvizity ani zbytočné rozptýlenia – len vy, vaše emócie a jemné svetlo. Práve tento premyslený, prirodzený prístup viedol mnohé rodiny k tomu, aby mi dlhodobo zverovali svoje najvzácnejšie spomienky a vracali sa ku mne rok čo rok.
        </p>
      </div>

      <!-- CTA -->
      <div class="text-center mt-14">
        <NuxtLink 
          to="/portfolio" 
          class="group font-script text-xl md:text-2xl italic text-charcoal-700 hover:text-warm-500 transition-colors inline-flex items-center gap-2"
        >
          Prezrieť moje portfólio
          <span class="relative h-5 w-5 md:h-6 md:w-6">
            <img src="/svg/icons/arrow-right.svg" alt="" class="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0" />
            <img src="/svg/icons/arrow-right-warm.svg" alt="" class="absolute inset-0 h-full w-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
