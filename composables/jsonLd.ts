import {CrumbType} from "~/app/types/crumbs";
// @ts-ignore
import {useJsonld} from "#jsonld";
import {useRoute} from "vue-router";
import {mainDomain} from "~/app/variables";

const makeUrl = (slug: string) => {
    if (slug == '') {
        slug = useRoute().path
    }
    return `${mainDomain.link}/${slug}`
}
export const jsonLd = (slug: string, crumbs?: CrumbType[] | undefined, params?: any, ogImage?: string) => {
    let result: any[] = []
    let breadcrumbsItems = crumbs?.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@id": makeUrl(item.link),
            name: item.title
        }
    }))
    let breadcrumbs = {}
    if (crumbs) {
        breadcrumbs = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbsItems
        }
    }

    const seller = {
        "@context": "https://schema.org/",
        "@type": "Order",
        "seller": {
            "@type": "Organization",
            "name": `${mainDomain.domain}`,
        }
    }

    let organization = {}
    if (slug !== "dealer") {
        organization = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": `${mainDomain.domain}`,
            "url": `${mainDomain.link}`,
            "logo": makeUrl("/logo.png"),
            "address": {},
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "areaServed": "RU",
                "availableLanguage": "Russian"
            }
        }
    }
    let ImageObject = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "author": `${mainDomain.domain}`,
        "contentUrl": makeUrl("/logo.png")
    }
    if (ogImage) {
        ImageObject = {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "author": `${mainDomain.domain}`,
            "contentUrl": ogImage
        }
    }
    result.push(breadcrumbs, seller, organization, ImageObject);
    useJsonld(result);
}