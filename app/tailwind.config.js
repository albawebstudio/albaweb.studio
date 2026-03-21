import {config} from "@fortawesome/fontawesome-svg-core";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue"
    ],
    plugins: [
        require('@tailwindcss/typography')
    ],
    safelist: [
        'bg-blue-700',
        'hover:bg-blue-800',
        'focus:ring-4',
        'focus:ring-blue-300',
        'dark:focus:ring-blue-900',
        'hover:text-gray-900 border',
        'border-white',
        'hover:bg-gray-100',
        'focus:ring-4',
        'focus:ring-gray-400',
        'sm:ms-4',
    ],
}

