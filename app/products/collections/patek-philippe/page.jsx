import { getProductsByCollection } from '../../../utils/shopify';
import CollectionClient from '../CollectionClient';

export async function generateMetadata() {
  return {
    title: 'Patek Philippe Watches - Luxury Times',
    description: 'Browse our collection of authentic Patek Philippe watches.',
  };
}

export default async function PatekPhilippeCollectionPage() {
  const { collection, products } = await getProductsByCollection('patek-philippe', 50);

  return <CollectionClient products={products} collection={collection} />;
}