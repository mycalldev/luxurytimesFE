import { getProductsByCollection } from '../../utils/shopify';
import FeaturedProductsClient from './FeaturedProductsClient';

export default async function FeaturedProducts({ currentProductHandle, collections }) {
  // If no collections, return null
  if (!collections || collections.length === 0) {
    return null;
  }

  // Get the first collection
  const primaryCollection = collections[0].node;
  
  // Fetch products from the collection
  const { products } = await getProductsByCollection(primaryCollection.handle, 10);

  // Filter out the current product and limit to 4 products
  const relatedProducts = products
    .filter(({ node }) => node.handle !== currentProductHandle)
    .slice(0, 4);

  // If no related products, return null
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <FeaturedProductsClient 
      products={relatedProducts}
      collectionTitle={primaryCollection.title}
      collectionHandle={primaryCollection.handle}
    />
  );
}

