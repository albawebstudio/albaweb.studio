import { ref } from 'vue'
import type { Contact } from '~/models/contact'

export function useContactData() {
    /*const items = ref<Item[]> ([
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
    ])*/
    const contact = ref<Contact> ({
        title: "About Alba Web Studio",
        content: "We’d love to hear about your web development needs! Whether you’re looking to build a custom website, enhance your online presence, or need ongoing support, we’re here to help. Fill out our contact form to get started, and let’s create something amazing together!",
        companyLabel: "Company information:",
        supportLabel: "Support:",
        supportUrl: "https://albawebstudio.raiseaticket.com/support/#/newticket",
        supportText: "Request support",
        locationLabel: "Location:",
        callLabel: "Call us:",
        callContent: "Call us! We are always happy to help."
    })

    return {
        contact,
    }

}
