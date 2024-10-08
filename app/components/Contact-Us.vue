<script setup lang="ts">
import { useSiteData } from "~/composables/useSiteData";
const { site, phone, social_links, getAddressByLabel } = useSiteData();
const address = getAddressByLabel("office");
</script>

<template>
  <section id="contact" class="bg-white dark:bg-gray-900">
    <div class="px-2">
      <div class="flex flex-wrap mx-4">
        <div class="w-full md:w-2/3 py-8 lg:py-16 px-4 mx-auto max-w-screen-md space-y-4">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            We’d love to hear about your web development needs! Whether you’re looking to build a custom website, enhance your online presence, or need ongoing support, we’re here to help. Fill out our contact form to get started, and let’s create something amazing together!
          </p>
          <form action="#" class="space-y-8">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required>
            </div>
            <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
          </form>
        </div>

        <div class="w-full md:w-1/3 flex flex-col place-content-center text-center place-items-center space-y-4 p-6 rounded-lg">
          <div class="flex flex-col items-center space-x-2">
            <div class="flex flex-col items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="font-semibold text-lg dark:text-white">Company information:</p>
          </div>
          <p class="text-gray-500 dark:gray-400">{{ site.legalName }}</p>

          <div class="flex flex-col items-center space-x-2">
            <div class="flex flex-col items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="font-semibold text-lg dark:text-white">Location:</p>
          </div>
          <p class="text-gray-500 dark:text-gray-400">{{ address.address1 }} {{ address.city }}, {{ address.state }} {{ address.zip }}</p>

          <div class="flex flex-col items-center space-x-2">
            <div class="flex flex-col items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <p class="font-semibold text-lg dark:text-white">Call us:</p>
          </div>
          <p class="text-gray-500 dark:text-gray-400">Call us! We are always happy to help.</p>
          <p class="text-primary-600 dark:te  xt-primary-500"><NuxtLink :to="'tel:' + phone.raw">{{phone.formatted}}</NuxtLink></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
