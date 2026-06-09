import { getAllProducts } from '../utils/shopify';
import ProductsClient from './ProductsClient';

export async function generateMetadata() {
  return {
    title: 'Luxury Watches - Rolex, Audemars Piguet, Patek Philippe',
    description: 'Browse our collection of luxury watches from the world\'s finest watchmakers.',
    alternates: { canonical: '/products' },
  };
}

export default async function ProductsPage(props) {
  const searchParams = await props.searchParams;
  const products = await getAllProducts(100);
  const collection = searchParams.collection;

  return <ProductsClient products={products} collection={collection} />;
}