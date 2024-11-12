import {config} from "@fortawesome/fontawesome-svg-core";
import tailwindConfig from "tailwindcss/stubs/tailwind.config.js";

/** @type {import('tailwindcss').Config} */

const albawebstudio = {
    colors: {
        'picton-blue': {
            DEFAULT: '#46A5E5',
            50: '#E7F3FC',
            100: '#D5EBF9',
            200: '#B1D9F4',
            300: '#8EC8EF',
            400: '#6AB6EA',
            500: '#46A5E5',
            600: '#1E8BD5',
            700: '#176BA4',
            800: '#104B73',
            900: '#092B41',
            950: '#061B29'
        },
    }
}

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue"
    ],
    theme: {
        extend: {
            colors: {
                primary: albawebstudio.colors['picton-blue'],
            },
        },
        fontFamily: {
            'revolin': [
                'Revolin',
            ],
            'all-genders': [
                'All-Genders',
            ],
        }
    },
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

