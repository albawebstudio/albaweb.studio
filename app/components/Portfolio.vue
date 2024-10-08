<script setup lang="ts">
import { usePortfolioData } from "~/composables/usePortfolioData";

const { portfolio } = usePortfolioData();
</script>

<template>
  <section id="portfolio" class="bg-gray-900 dark:bg-white text-slate-200 dark:text-black antialiased">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl dark:text-gray-900">
          {{ portfolio.title }}
        </h2>
        <p v-for="content in portfolio.content" class="mt-4 text-base font-normal text-gray-400 dark:text-gray-500" v-html="content"></p>
      </div>

      <div class="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
<!--        <div v-for="item in portfolio.items" class="space-y-4">
        <span
            class="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {{ item.title }}
        </span>
          <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
            {{ item.service }}
          </h3>
          <p v-for="content in item.content" class="font-normal text-gray-500 dark:text-gray-400" v-html="content"></p>
          <NuxtLink
              :to="item.cta.to"
              :external="item.cta.external"
              class="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              role="button">
            {{ item.cta.displayText }}
            <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor">
              <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>-->
        <div v-for="item in portfolio.items" class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
          <div
              class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
            <img
                :src="item.img.src"
                :alt="item.img.alt" />
          </div>
          <div class="p-6">
            <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {{ item.title }}
            </h5>
            <p v-for="content in item.content" class="block font-sans text-base antialiased font-light leading-relaxed text-inherit" v-html="content"></p>
          </div>
          <div class="p-6 pt-0">
            <NuxtLink
                :to="item.cta.to"
                :external="item.cta.external"
                class="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                role="button">
              {{ item.cta.displayText }}
              <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor">
                <path fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
              </svg>
            </NuxtLink>
<!--            <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button">
              Read More
            </button>-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
