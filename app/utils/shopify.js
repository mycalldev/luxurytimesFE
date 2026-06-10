const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Whether a product has the custom.poa boolean metafield set to true.
// Shopify returns boolean metafields as the string "true" / "false".
export function isPOA(product) {
  return product?.poa?.value === 'true';
}

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
              sortOrder: metafield(namespace: "custom", key: "sort_order") {
                value
              }
              poa: metafield(namespace: "custom", key: "poa") {
                value
              }
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
            sortOrder: metafield(namespace: "custom", key: "sort_order") {
              value
            }
            poa: metafield(namespace: "custom", key: "poa") {
              value
            }
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
        year: metafield(namespace: "custom", key: "year") {
          value
          type
        }
        condition: metafield(namespace: "custom", key: "condition") {
          value
          type
        }
        greenSwingTag: metafield(namespace: "custom", key: "green_swing_tag") {
          value
          type
        }
        whiteSwingTag: metafield(namespace: "custom", key: "white_swing_tag") {
          value
          type
        }
        poa: metafield(namespace: "custom", key: "poa") {
          value
        }
        reference: metafield(namespace: "watch_spec", key: "reference") {
          value
        }
        model: metafield(namespace: "watch_spec", key: "model") {
          value
        }
        dial: metafield(namespace: "watch_spec", key: "dial") {
          value
        }
        caseMaterial: metafield(namespace: "watch_spec", key: "case_material") {
          value
        }
        caseSize: metafield(namespace: "watch_spec", key: "case_size") {
          value
        }
        bezel: metafield(namespace: "watch_spec", key: "bezel") {
          value
        }
        crystal: metafield(namespace: "watch_spec", key: "crystal") {
          value
        }
        movement: metafield(namespace: "watch_spec", key: "movement") {
          value
        }
        powerReserve: metafield(namespace: "watch_spec", key: "power_reserve") {
          value
        }
        functions: metafield(namespace: "watch_spec", key: "functions") {
          value
        }
        bracelet: metafield(namespace: "watch_spec", key: "bracelet") {
          value
        }
        clasp: metafield(namespace: "watch_spec", key: "clasp") {
          value
        }
        waterResistance: metafield(namespace: "watch_spec", key: "water_resistance") {
          value
        }
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


// Get featured products (tagged with 'feature' in Shopify)
export async function getFeaturedProducts(first = 10) {
  const query = `
    {
      products(first: ${first}, query: "tag:feature", sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
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
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            tags
            vendor
            productType
            poa: metafield(namespace: "custom", key: "poa") {
              value
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  return response.data?.products?.edges || [];
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

// Search products by query — matches against title, vendor, product type, and tags
export async function searchProducts(searchQuery, first = 60) {
  const sanitized = searchQuery.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

  const query = `
    {
      products(first: ${first}, query: "${sanitized}") {
        edges {
          node {
            id
            title
            handle
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            tags
            poa: metafield(namespace: "custom", key: "poa") {
              value
            }
          }
        }
      }
    }
  `

  const response = await ShopifyData(query)
  return response.data?.products?.edges || []
}

export default ShopifyData;