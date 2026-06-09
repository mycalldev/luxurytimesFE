import { getProductsByCollection } from '../../../utils/shopify';
import CollectionClient from '../CollectionClient';

export async function generateMetadata() {
  return {
    title: 'Patek Philippe Watches - Luxury Times',
    description: 'Browse our collection of authentic Patek Philippe watches.',
    alternates: { canonical: '/products/collections/patek-philippe' },
  };
}

export default async function PatekPhilippeCollectionPage(props) {
  const searchParams = await props.searchParams;
  const { collection, products } = await getProductsByCollection('patek-philippe', 50);
  const initialModel = searchParams?.model;

  return <CollectionClient products={products} collection={collection} initialModel={initialModel} />;
}