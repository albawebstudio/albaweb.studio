import { ref } from 'vue'
import type { Portfolio, Item } from '~/models/portfolio'

export function usePortfolioData() {
    const items = ref<Item[]>([
        {
            title: "The Haunted Farm",
            service: "Website",
            content: [
                "The Haunted Farm offers thrilling, immersive experiences through haunted attractions on a spooky farm and woods near Moorhead, MN, with 15 haunts like a haunted house and maze. It’s perfect for a fright-filled night in October.",
            ],
            img: {
                src: "/portfolio/hauntedfarm.com.jpg",
                alt: "The Haunted Farm"
            },
            cta: {
                title: "The Haunted Farm",
                to: "https://hauntedfarm.com",
                external: true,
                icon: null,
                displayText: "View Site"
            }
        },
        {
            title: "New Leash Rescue",
            service: "Website",
            content: [
                "New Leash Rescue is a Minnesota-based animal rescue focused on saving and rehoming dogs in need. They connect adoptable pets with loving families and promote responsible pet ownership through foster care and adoption."
            ],
            img: {
                src: "/portfolio/newleashrescue.org.jpg",
                alt: "New Leash Rescue"
            },
            cta: {
                title: "New Leash Rescue",
                to: "https://newleashrescue.org",
                external: true,
                icon: null,
                displayText: "View Site"
            }
        },
        {
            title: "The Toe Nurse",
            service: "Website",
            content: [
                "The Toe Nurse offers professional, mobile foot care services by a certified foot care specialist in the Minnesota area. Specializing in nail trimming, callus reduction, and ingrown nail management, they bring convenient, expert care directly to your home or business.",
            ],
            img: {
                src: "/portfolio/thetoenurse.com.jpg",
                alt: "The Toe Nurse"
            },
            cta: {
                title: "The Toe Nurse",
                to: "https://thetoenurse.com",
                external: true,
                icon: null,
                displayText: "View Site"
            }
        },
        {
            title: "Ocho Fitness",
            service: "Website",
            content: [
                "Ocho Fitness, led by certified trainer Jovani Morales, offers personalized fitness programs combining weightlifting, cardio, and core work. Jovani’s passion is helping clients improve strength, flexibility, and conditioning while staying pain-free. Services include personal training, sports massage, and online training.",
            ],
            img: {
                src: "/portfolio/ochofitness.com.jpg",
                alt: "Ocho Fitness"
            },
            cta: {
                title: "Ocho Fitness",
                to: "https://ochofitness.com",
                external: true,
                icon: null,
                displayText: "View Site"
            }
        },
        {
            title: "Sad Trombone",
            service: "Website",
            content: [
                "Sadtromb.one is an audio-based website that offers various sounds, including a “sad trombone” sound effect, which can be accessed through Amazon Alexa skills and other compatible devices.",
            ],
            img: {
                src: "/portfolio/sadtromb.one.jpg",
                alt: "Sad Trombone"
            },
            cta: {
                title: "Sad Trombone",
                to: "https://sadtromb.one",
                external: true,
                icon: null,
                displayText: "View Site"
            }
        },
        {
            title: "DingoBytes",
            service: "Website",
            content: [
                "A technology and software development blog that shares insights, projects, and experiences in web development and innovation.",
            ],
            img: {
                src: "/portfolio/dingobytes.com.jpg",
                alt: "DingoBytes"
            },
            cta: {
                title: "DingoBytes",
                to: "https://dingobytes.com",
                external: true,
                icon: null,
                displayText: "View Site"
            }
        }
    ])
    const portfolio = ref<Portfolio>({
        title: "Our Work",
        content: [
            "At Alba Web Studio, every project is a collaboration crafted with skill and care to help our clients grow their businesses. We specialize in building custom, user-friendly websites that highlight the unique stories of small businesses and connect them to their communities. Our single-page applications are designed to be intuitive, fast, and engaging, ensuring that your audience can easily find what they need and interact with your brand. Whether it’s through social media integration, seamless navigation, or clear calls to action, each project reflects our commitment to quality and creativity.",
            "Explore our work and see how we’ve helped businesses like yours make their mark online!"
        ],
        items: items.value
    })

    return {
        items,
        portfolio,
    }
}
