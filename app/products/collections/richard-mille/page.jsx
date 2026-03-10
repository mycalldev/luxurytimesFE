import { getProductsByCollection } from '../../../utils/shopify';
import CollectionClient from '../CollectionClient';

export async function generateMetadata() {
  return {
    title: 'Richard Mille Watches - Luxury Times',
    description: 'Browse our collection of authentic Richard Mille watches.',
  };
}

export default async function RichardMilleCollectionPage() {
  const { collection, products } = await getProductsByCollection('richard-mille', 50);

  return <CollectionClient products={products} collection={collection} />;
}
