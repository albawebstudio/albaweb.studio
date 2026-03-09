import { ref } from 'vue'

import type { Blog } from '~/models/blog'

export function useBlogData() {

    const blog = ref<Blog>({
        title: "Web Development Digest",
        description: "Simplifying the Complex World of Digital Solutions"
    })

    return {
        blog,
    }
}
