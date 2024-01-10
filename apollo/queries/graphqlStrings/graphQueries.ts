export default {
    siteConfig: `query seoTag(
        $site_id:Int
    ){
        catalog(site_id: $site_id) {
            id
            slug
            folders {
                id
                slug
                taxi
            }
        }
        sets(site_id: $site_id) {
            title
            slug
        }
  }`,
    folders: `query folders($site_id: Int!, $taxi: Boolean, $page:Int, $limit:Int) {
    folders(site_id: $site_id,page: $page,limit: $limit, taxi:$taxi)
    {
        data{
            id
            slug
            mark{
                id
                slug
            }
        }
    }
  }`,
    newOffers: `query offers(
    $site_id: Int!,
    $page:Int,
    $limit:Int
) {
    offers(
        site_id: $site_id,
        page: $page,
        limit: $limit,
    )
    {
        data{
            id
            mark{
                id
                slug
            }
            folder{
                id
                slug
            }
        }
    }
}`,
    siteId: {
        old: 173,
        new: 1,
    },
}