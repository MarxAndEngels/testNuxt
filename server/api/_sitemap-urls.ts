import type {SiteConfigType} from "~/apollo/queries/siteConfig";
import type {NewOffersDataType} from "~/apollo/queries/new/newOffers";
import type {FolderDataType} from "~/apollo/queries/new/folders";
import graphQueries from "~/apollo/queries/graphqlStrings/graphQueries";
import {newApiDomain} from "~/app/variables";

type SitemapUrl = {
  loc: string;
  lastmod: Date;
  isTaxi?: boolean
}

type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
type ArrayOfKeys<T> = Readonly<OptionalKeys<T>>[];

function clearUselessFields<E extends Array<SitemapUrl>, T extends ArrayOfKeys<SitemapUrl>>(sitemapList: E, fields: T) {
  return sitemapList.map(sitemap => {
    fields.forEach(field => {
      if(field in sitemap) delete sitemap[field];
    });
    return sitemap;
  });
}
export default cachedEventHandler(async (): Promise<Exclude<SitemapUrl, OptionalKeys<SitemapUrl>>[]> => {
  type Response<T> = {
    data: T
  };
  type Query = {
    query: string,
    variables: object,
  }
  const { siteId: { new: newSiteId }, folders, siteConfig, newOffers } = graphQueries;
  const queries: Readonly<[Query, Query, Query]> = [
    {
      query: siteConfig,
      variables: {
        site_id: newSiteId
      }
    },
    {
      query: folders,
      variables: {
        site_id: newSiteId,
        taxi: true,
        page: null,
        limit: 999
      }
    },
    {
      query: newOffers,
      variables: {
        site_id: newSiteId,
        page: null,
        limit: 9999
      }
    }
  ];
  type QueryResults = Readonly<[Response<SiteConfigType>, Response<FolderDataType>, Response<NewOffersDataType>]>;
  const [ { data: { catalog, sets} }, { data: { folders: { data: taxis } } }, { data: { offers: { data: offersResponse } } } ]: QueryResults = await Promise.all(queries.map(async ({query, variables}) => {
    return await $fetch(`https://${newApiDomain}/graphql`, {
      method: "POST",
      body: {
        query,
        variables
      }
    });
  })) as unknown as QueryResults;

  const currentBuildDate = new Date();
  const offersSitemap: SitemapUrl[] = offersResponse.map(offer => ({
    loc: `new/${offer.mark.slug}/${offer.folder.slug}/${offer.id}`,
    lastmod: currentBuildDate,
  }));
  const taxisSitemap = taxis.map(taxi => ({
    loc: `credit-taxi/${taxi.mark.slug}-${taxi.slug}`,
    lastmod: currentBuildDate,
  }));
  const newCarsWithModel = catalog.map(car => {
    return [{ loc: `new/${car.slug}`, lastmod: currentBuildDate }, ...car.folders.map(model => ({
      loc: `new/${car.slug}/${model.slug}`,
      lastmod: currentBuildDate,
      isTaxi: model.taxi
    }))];
  }).flat() as SitemapUrl[];
  const setsSitemap: SitemapUrl[] = sets.map(set => ({
    loc: `sets/${set.slug}`,
    lastmod: currentBuildDate,
  }));
  const taxiCars = clearUselessFields(newCarsWithModel, ['isTaxi']).filter(car => {
    return car.isTaxi ? { loc: `credit-taxi/${car}`, lastmod: currentBuildDate } : false;
  });
  return [...clearUselessFields(newCarsWithModel, ['isTaxi']), ...setsSitemap, ...taxiCars, ...taxisSitemap, ...offersSitemap];
}, {
  swr: true,
  maxAge: 1000 * 60 * 60 * 24 // 1 день или до следующего билда
});