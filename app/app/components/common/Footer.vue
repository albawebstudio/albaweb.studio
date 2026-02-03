<script setup lang="ts">
import { useSiteData } from "~/composables/useSiteData";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { social_links, useful_links, other_resources } = useSiteData();
const date = new Date();
const currentYear = date.getFullYear();
</script>

<template>
  <footer class="relative bg-slate-200 text-gray-800 dark:bg-gray-900 dark:text-slate-200 pt-8 pb-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap text-left lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <h4 class="text-3xl fonat-semibold text-blueGray-700">Let’s stay connected!</h4>
          <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
            Hit us up on any of our social platforms, and we’ll get back to you in a few days. Looking forward to chatting!
          </h5>
          <div class="mt-6 lg:mb-0 mb-6">
            <button v-for="social in social_links"
                    :key="social.label"
                    class="text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    :class="'bg-' + social.label"
                    type="button">
              <NuxtLink
                        :to="social.href"
                        :external="social.external"
                        target="_blank"
                        rel="noopener">
                <font-awesome-icon :icon="social.icon"/>
              </NuxtLink>
            </button>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
              <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
              <ul class="list-unstyled">
                <li v-for="(link, idx) in useful_links" :key="idx">
                  <NuxtLink :to="link.to"
                            :external="link.external"
                            class="text-gray-800 hover:text-gray-600 dark:text-slate-200 dark:hover:text-slate-400 font-semibold block pb-2 text-sm"
                            :target="link.external ? '_blank' : '_self'"
                            rel="noopener">{{ link.displayText }}</NuxtLink>
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
              <ul class="list-unstyled">
                <li v-for="(link, idx) in other_resources" :key="idx">
                  <NuxtLink :to="link.to"
                            :external="link.external"
                            class="text-gray-800 hover:text-gray-600 dark:text-slate-200 dark:hover:text-slate-400 font-semibold block pb-2 text-sm"
                            :target="link.external ? '_blank' : '_self'"
                            rel="noopener">{{ link.displayText }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-blueGray-300">
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-blueGray-500 font-semibold py-1">
            Copyright &copy; 2007-{{ currentYear }} <a href="https://albaweb.studio.com?ref=aws-profile" class="text-blueGray-500 hover:text-blueGray-800">Alba Web Studio</a>.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
