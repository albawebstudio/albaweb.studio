import { ref } from 'vue'
import type { Contact } from '~/models/contact'

export function useContactData() {
    const supportUrl = "https://albawebstudio.raiseaticket.com/support/#/newticket";
    const supportText = "Request support";
    const contact = ref<Contact> ({
        title: "About Alba Web Studio",
        content: [
            "We’d love to hear about your next project! Whether you’re looking to build a custom website or enhance your online presence, please fill out our contact form below to get started.",
            "<strong class=\"font-bold\">Already a client?</strong> If you need technical assistance or ongoing support, please <a href=\"" + supportUrl + "\" target=\"_blank\" title=\"" + supportText + "\" class=\"text-primary font-bold\">submit a support ticket here</a> for the fastest resolution."
        ],
        companyLabel: "Company information:",
        supportLabel: "Support:",
        supportUrl: supportUrl,
        supportText: supportText,
        locationLabel: "Location:",
        callLabel: "Call us:",
        callContent: "Call us! We are always happy to help."
    })

    return {
        contact,
    }

}
