<script setup lang="ts">
const emit = defineEmits(['updateClearSuccess'])

const callClearSuccess = () => {
  emit('updateClearSuccess');
}
</script>

<template>
  <div class="flex items-center justify-center opacity-100 transition duration-1000 ease-in-out">
    <div class="rounded-lg bg-gray-800 px-16 py-14">
      <div class="flex justify-center">
        <div class="rounded-full bg-green-200 p-6">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
      </div>
      <h3 class="my-4 text-center text-3xl font-semibold text-slate-100">Congratulation!!!</h3>
      <p class="w-[230px] text-center font-normal text-slate-300">Your message have been submitted and will be reviewed shortly.</p>
      <button @click="callClearSuccess" class="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-primary-600 px-6 py-3 text-center text-base font-medium text-primary-100 outline-8 hover:outline hover:duration-300">Clear Message</button>
    </div>
  </div>
</template>

<style scoped>

</style>
