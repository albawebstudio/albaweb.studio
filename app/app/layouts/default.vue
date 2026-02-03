<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-black'
  },
  link: [
    {
      rel: 'android-chrome-192x192',
      sizes: '192x192',
      href: '/android-chrome-192x192.png'
    },
    {
      rel: 'android-chrome-512x512',
      sizes: '512x512',
      href: '/android-chrome-512x512.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/vnd.microsoft.icon',
      sizes: '16x16',
      href: '/favicon.ico',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    }
  ],
  meta: [
    {
      name: 'msapplication-TileColor',
      content: '#da532c'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    }
  ],
})
</script>

<template>
  <CommonNavigation/>
  <slot></slot>
  <CommonFooter />
</template>

<style scoped>

</style>
