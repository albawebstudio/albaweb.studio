<script setup lang="ts">
import { useSiteData } from "~/composables/useSiteData";
const { site, ctas } = useSiteData();
</script>

<template>
  <section class="bg-center bg-no-repeat bg-[url('/images/charlesdeluvio.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to {{ site.title }}</h1>
      <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{{ site.tagLine }}</p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <template v-for="(cta, idx) in ctas" :key="idx">
          <NuxtLink :to="cta.to"
                    :title="cta.title"
                    :class="['inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg', cta.className]">
            {{ cta.displayText }}
            <svg v-if="idx === 0" class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
