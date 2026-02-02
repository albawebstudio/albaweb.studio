import type { Image, Link } from '~/models/common'

export interface Portfolio {
    title:   string;
    content: string[];
    items: Item[];
}

export interface Item {
    title:   string;
    service: string;
    content: string[];
    img: Image;
    cta: Link
}
