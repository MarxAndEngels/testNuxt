import {mainDomain} from "~/app/variables";

export default defineEventHandler((event) => {
    const host = getRequestHost(event)

    let data = "User-agent: *\n" +
        "Disallow: /";

    if (host == mainDomain.domain) {
        data = "User-agent: *\n" +
            "Disallow: /"
    }
    setResponseHeader(event, 'Content-Type', 'text/plain')
    return data
})