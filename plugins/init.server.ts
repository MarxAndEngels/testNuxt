import {defineNuxtPlugin} from '#app';
import {domains, mainDomain} from "~/app/variables";
import {useSiteConfig} from "~/store/siteConfig";

export default defineNuxtPlugin(async ({ssrContext}) => {
    // const host = ssrContext?.event.node.req.headers.host
    // let filteredDomain = domains.filter(value => value.domain === host)
    // let currentDomain = filteredDomain.length ? filteredDomain[0] : mainDomain

    const siteConfig = useSiteConfig()

    await siteConfig.getSiteConfig()


});