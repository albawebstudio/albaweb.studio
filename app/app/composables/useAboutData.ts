import { ref } from 'vue'
import type { About, Item } from '~/models/about'

export function useAboutData() {
    const items = ref<Item[]> ([
        {
            icon: 'fa-code',
            title: "Custom Website Design & Development",
            content: [
                "Small businesses need personalized designs to stand out and establish credibility. We build visually appealing, responsive websites that reflect your brand’s identity. Our designs are mobile-friendly, have intuitive user interfaces (UI), and are optimization for search engines (SEO)."
            ]
        },
        {
            icon: 'fa-file-code',
            title: "Single-Page Applications",
            content: [
                "SPAs provide a streamlined user experience ideal for small businesses that want to communicate clearly and efficiently. Our formula is to build simple, fast-loading web applications that give users all the essential information on one page. We provide minimalist layouts, social media integration, clear calls to action, and smooth navigation."
            ]
        },
        {
            icon: 'fa-share-alt-square',
            title: "Social Media Integration & Marketing Tools",
            content: [
                "Small businesses thrive on community and visibility. Integrating social platforms allows for easy customer connection and brand growth. We aim to seamlessly integrating social media channels and marketing tools to boost customer engagement. Everything from links to Facebook, Instagram, LinkedIn, Twitter, as well as email subscription forms, and analytics tracking."
            ]
        },
        {
            icon: 'fa-wrench',
            title: "Website Maintenance & Support",
            content: [
                "Many small business owners don’t have the time or expertise to manage technical updates and site maintenance, and having a trusted partner like Alba Web Studio makes this hassle-free. We can ensure you have ongoing updates, bug fixes, and performance optimization to ensure the site runs smoothly. We offer security updates, speed improvements, and content updates."
            ]
        }
    ])
    const about = ref<About> ({
        title: "About Alba Web Studio",
        content: [
            "We are a small boutique web development company that focuses on offering services that cater to the unique needs of small businesses. Our strategy is to provide an emphasis on simplicity, engagement, and usability. Here are some of the services we provide:"
        ],
        items: items.value,
    })

    return {
        items,
        about,
    }

}
