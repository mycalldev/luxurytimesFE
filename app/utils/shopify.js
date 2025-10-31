const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2024-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, {
      ...options,
      next: { revalidate: 60 } 
    }).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Failed to fetch Shopify data");
  }
}


// Get all blog articles
export async function getAllArticles(blogHandle = "News") {
  const query = `
    {
      blog(handle: "${blogHandle}") {
        title
        handle
        articles(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              publishedAt
              excerpt
              excerptHtml
              image {
                url
                altText
              }
              author {
                name
              }
              tags
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  response.data?.blog?.articles?.edges?.forEach(({ node: article }) => {
  
  });
  return response.data.blog?.articles.edges || [];
}

// Get single article by handle
export async function getArticle(blogHandle = "News", articleHandle) {
  const query = `
    {
      blog(handle: "${blogHandle}") {
        articleByHandle(handle: "${articleHandle}") {
          id
          title
          handle
          publishedAt
          content
          contentHtml
          excerpt
          image {
            url
            altText
          }
          author {
            name
          }
          tags
          seo {
            title
            description
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  return response.data.blog?.articleByHandle;
}

export default ShopifyData;