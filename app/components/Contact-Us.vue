<script setup lang="ts">
import { ref } from 'vue';
const apiUrl = useRuntimeConfig().public.apiUrl
import { useSiteData } from "~/composables/useSiteData";
const { site, phone, getAddressByLabel } = useSiteData();
const address = getAddressByLabel("office");

interface formData {
  name: string,
  subject: string,
  email: string,
  message: string,
}

const showSpinner = ref(false);
const showSuccess = ref(false);
const showForm = computed(() => !showSuccess.value);

const getInitialFormData = () => ({
  name: "",
  subject: "",
  email: "",
  message: "",
});

const form: formData = reactive(getInitialFormData());
const resetForm = () => Object.assign(form, getInitialFormData());

const submitForm = async () => {
  showSpinner.value = true
  // validate
  if (!form.name.trim() || !form.email.trim()) {
    showSpinner.value = false
    return;
  }
  try{
    const response = await fetch(`${apiUrl}/contact-form`, {
      method: "POST",
      body: JSON.stringify(form),
    } )
    if (!response.ok){
      //Do something when request fails
      return
    }
    resetForm()
    showSpinner.value = false
    showSuccess.value = true
  } catch (e) {
    console.log(e);
    showSpinner.value = false
  }
}
const clearSuccess = () => {
  resetForm()
  showSuccess.value=false
}
</script>

<template>
  <section id="contact-us" class="bg-white dark:bg-gray-900">
    <div class="px-2">
      <div class="flex flex-wrap mx-4">
        <div class="w-full md:w-2/3 py-8 lg:py-16 px-4 mx-auto max-w-screen-md space-y-4">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            We’d love to hear about your web development needs! Whether you’re looking to build a custom website, enhance your online presence, or need ongoing support, we’re here to help. Fill out our contact form to get started, and let’s create something amazing together!
          </p>
          <template v-if="showSpinner">
            <div class="space-y-8 h-96 flex items-center justify-center">
              <svg role="status" class="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
                   viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
              </svg>
            </div>
          </template>
          <template v-if="showForm">
            <form @submit.prevent="submitForm" class="space-y-8">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Full Name</label>
                <input v-model="form.name" type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Good Person" required>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                <input v-model="form.email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="you@yourdomain.com" required>
              </div>
              <div>
                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                <input v-model="form.subject" type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required>
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea v-model="form.message" id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
              </div>
              <button @click.prevent="submitForm"  type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
            </form>
          </template>
          <template v-if="showSuccess">
            <div class="flex min-h-screen items-center justify-center bg-gray-100">
              <div class="rounded-lg bg-gray-50 px-16 py-14">
                <div class="flex justify-center">
                  <div class="rounded-full bg-green-200 p-6">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 class="my-4 text-center text-3xl font-semibold text-gray-700">Congratuation!!!</h3>
                <p class="w-[230px] text-center font-normal text-gray-600">Your message have been submitted and will be reviewed shortly.</p>
                <button @click="clearSuccess" class="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300">Clear Message</button>
              </div>
            </div>
          </template>
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
