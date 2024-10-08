<script setup lang="ts">
import { useAboutData } from "~/composables/useAboutData";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { about } = useAboutData();
</script>

<template>
  <section id="about-us" class="h-full min-h-screen w-full bg-slate-200 dark:bg-gray-900 text-black dark:text-slate-200 pt-12 p-4">

    <div class="text-center w-1/2 mx-auto mb-12">
      <h2 class="font-all-genders text-4xl leading-relaxed uppercase">{{ about.title }}</h2>
      <div v-for="content in about.content" class="text-secondary mt-8" v-html="content"></div>
    </div>

    <div class="w-2/3 mx-auto grid lg:grid-cols-2 lg:gap-5">
      <div v-for="item in about.items" class="rounded-xl bg-white text-gray-800 p-6 pb-8 text-center shadow-xl mb-8">
        <div
            class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-white shadow-lg shadow-primary-700/40">
          <font-awesome-icon :icon="item.icon" class="text-secondary leading-10" />
        </div>
        <h3 class="text-darken mb-3 text-xl font-bold uppercase lg:px-14">{{ item.title }}</h3>
        <p v-for="content in item.content" class="px-4 text-gray-500 tracking-tight" v-html="content"></p>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
