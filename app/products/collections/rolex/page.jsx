import { getProductsByCollection } from '../../../utils/shopify';
import RolexClient from './RolexClient';

export async function generateMetadata() {
  return {
    title: 'Rolex Watches - Luxury Times',
    description: 'Browse our collection of authentic Rolex watches.',
  };
}

export default async function RolexCollectionPage({ searchParams }) {
  const { collection, products } = await getProductsByCollection('rolex', 50);
  const initialModel = searchParams?.model;

  return <RolexClient products={products} collection={collection} initialModel={initialModel} />;
}