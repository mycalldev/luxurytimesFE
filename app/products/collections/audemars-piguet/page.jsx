import { getProductsByCollection } from '../../../utils/shopify';
import CollectionClient from '../CollectionClient';

export async function generateMetadata() {
  return {
    title: 'Audemars Piguet Watches - Luxury Times',
    description: 'Browse our collection of authentic Audemars Piguet watches.',
  };
}

export default async function AudemarsPiguetCollectionPage() {
  const { collection, products } = await getProductsByCollection('audemars-piguet', 50);

  return <CollectionClient products={products} collection={collection} />;
}