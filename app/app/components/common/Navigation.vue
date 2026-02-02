<script setup lang="ts">
import { ref } from 'vue'
import { useSiteData } from "~/composables/useSiteData";
const { navigation } = useSiteData();

const showMenu = ref(false);
const toggleNav = () => (showMenu.value = !showMenu.value);
</script>

<template>


  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logos/albawebstudio-logo-dark.svg" class="h-8" alt="Alba Web Studio"/>
        <span class="self-center font-all-genders text-2xl font-semibold whitespace-nowrap dark:text-white">Alba <span class="font-revolin">Web Studio</span></span>
      </a>
      <button @click="toggleNav"
              data-collapse-toggle="navbar-default"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div :class="showMenu ? 'flex' : 'hidden'" class="w-full md:block md:w-auto lg:mr-3" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 w-full mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li v-for="nav in navigation" :key="nav.title">
            <NuxtLink :to="nav.to"
                      :title="nav.title"
                      class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-700 md:p-0 dark:text-white md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                {{ nav.displayText }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<style scoped>

</style>
