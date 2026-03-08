<script setup lang="ts">
import { format } from 'date-fns'
import { useBlogData } from "~/composables/useBlogData"

definePageMeta({
  layout: "default",
})

type BlogMeta = {
  backgroundImage?: string
  last_updated_at?: string
}

type BlogPostListItem = {
  path: string
  title?: string
  description?: string
  meta?: BlogMeta
}

const { blog } = useBlogData()
const { data: blogs } = await useAsyncData<BlogPostListItem[]>('blog', () =>
    queryCollection('blog')
        .select('path', 'title', 'description', 'meta')
        .all()
)
const pubDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  return format(new Date(dateStr), "MMMM do, yyyy"); // "do" adds the ordinal suffix automatically
}

useHead({
  title: 'Andrew Alba | Blog',
  meta: [
    {
      name: 'description',
      content: `Musings by Andrew Alba`,
    }
  ]
})
</script>

<template>
  <section id="article-blogs" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-boston-blue px-4 sm:px-40">
      <h1 class="text-6xl font-bold text-center text-gray-900 dark:text-white mb-4">{{ blog.title }}</h1>
      <p class="text-center text-gray-900 dark:text-gray-100 italic">{{ blog.description }}</p>
    </div>
    <div
        class="bg-white w-full sm:max-w-7xl dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="data in blogs" :key="data.path">
          <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg flex flex-col h-full">
            <img
                :alt="data.description"
                :src="data.meta?.backgroundImage"
                class="h-56 w-full object-cover"
            />

            <div class="bg-white p-4 sm:p-6 flex flex-col flex-1">
              <time :datetime="data.meta?.last_updated_at" class="block text-xs text-gray-500">
                {{ pubDate(data.meta?.last_updated_at) }}
              </time>

              <NuxtLink :to="data.path"
                        :title="data.title">
                <h3 class="mt-0.5 text-lg text-gray-900">{{ data.title }}</h3>
              </NuxtLink>

              <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 flex-1">
                {{ data.description }}
              </p>

              <NuxtLink :to="data.path"
                        :title="data.title"
                        class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Read more
                <span aria-hidden="true" class="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
              </NuxtLink>
            </div>
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<style scope>

</style>
