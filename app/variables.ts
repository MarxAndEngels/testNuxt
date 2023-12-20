export const newApiDomain = 'api.atlas-dealer.ru'
export const apiSlug = 'atlas-dealer'
export const domains = [
    {
        domain: 'atlas-official.ru',
        title: 'ATLAS-DEALER',
        // атлас-авто.рф
        link: 'https://atlas-official.ru',
        catalogRoute: 'used',
        hasGeneration: true,
        root: true
    },
]
export const mainDomain = domains.find(value => value.root) || domains[0]