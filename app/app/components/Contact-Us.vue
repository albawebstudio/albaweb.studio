<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useSiteData } from "~/composables/useSiteData"
import Spinner from "~/components/common/Spinner.vue"
import ContactForm   from "~/components/common/ContactForm.vue"
import Success from "~/components/common/Success.vue"
import useGoogleRecaptcha, {
  RecaptchaAction,
} from "~/composables/useGoogleRecaptcha"
import type { GoogleRecaptchaResponse } from "~/models/types/google-recaptcha-response"

const { executeRecaptcha } = useGoogleRecaptcha();
const { site, phone, getAddressByLabel } = useSiteData()
const address = getAddressByLabel("office")

interface FormData {
  name: string,
  subject: string,
  email: string,
  message: string,
}

const apiUrl = useRuntimeConfig().public.apiUrl
const showSpinner = shallowRef(false)
const showSuccess = shallowRef(false)
const showForm = computed(() => !showSuccess.value && !showSpinner.value)

const getInitialFormData = (): FormData => ({
  name: "",
  subject: "",
  email: "",
  message: "",
})

const form = ref<FormData>(getInitialFormData());
const resetForm = () => Object.assign(form.value, getInitialFormData());

const isFormValid = computed(() => {
  return form.value.name.trim() &&
      form.value.email.trim() &&
      form.value.subject.trim() &&
      form.value.message.trim();
});

const submitForm = async () => {
  showSpinner.value = true
  // validate
  if (!isFormValid) {
    showSpinner.value = false
    return;
  }
  try{
    const { token } = await executeRecaptcha(RecaptchaAction.login);
    const verificationResponse = await useApi<GoogleRecaptchaResponse>('/api/recaptcha', {
      method: 'POST',
      body: {
        token
      }
    })

    if (!verificationResponse.success) {
      throw new Error('reCAPTCHA verification failed');
    }

    const response = await fetch(`${apiUrl}/contact-form`, {
      method: "POST",
      body: JSON.stringify(form.value),
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

          <Spinner v-if="showSpinner" />

          <ContactForm
              v-if="showForm"
              v-model:name.trim="form.name"
              v-model:email.trim="form.email"
              v-model:subject.trim="form.subject"
              v-model:message.trim="form.message"
              @submit="submitForm"
          />

          <Success @updateClearSuccess="clearSuccess" v-if="showSuccess" />

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
          <p class="text-gray-500 dark:text-gray-400">{{ address?.address1 }} {{ address?.city }}, {{ address?.state }} {{ address?.zip }}</p>

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
