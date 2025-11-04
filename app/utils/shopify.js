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

// Get all products from a specific collection
export async function getProductsByCollection(collectionHandle, first = 20) {
  const query = `
    {
      collection(handle: "${collectionHandle}") {
        title
        handle
        description
        products(first: ${first}) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              tags
              vendor
              productType
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  return {
    collection: response.data?.collection,
    products: response.data?.collection?.products.edges || []
  };
}

// Get all products from multiple collections
export async function getAllProducts(first = 50) {
  const query = `
    {
      products(first: ${first}, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            collections(first: 5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            tags
            vendor
            productType
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  return response.data?.products.edges || [];
}

// Get single product by handle
export async function getProduct(productHandle) {
  const query = `
    {
      product(handle: "${productHandle}") {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
        tags
        vendor
        productType
        collections(first: 5) {
          edges {
            node {
              title
              handle
            }
          }
        }
        seo {
          title
          description
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  return response.data?.product;
}

// Get products from all three watch collections
export async function getAllWatchCollections() {
  const collections = ['rolex', 'audemars-piguet', 'patek-philippe'];
  
  const results = await Promise.all(
    collections.map(handle => getProductsByCollection(handle))
  );

  return {
    rolex: results[0],
    audemarsPiguet: results[1],
    patekPhilippe: results[2]
  };
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