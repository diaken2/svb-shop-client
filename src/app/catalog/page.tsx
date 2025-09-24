import type { Metadata } from 'next';
import { generateCatalogMetadata } from '@/lib/seo-utils';
import CatalogPage from './CatalogPage';

export async function generateMetadata(): Promise<Metadata> {
  return await generateCatalogMetadata();
}

export default function CatalogPageWrapper() {
  return <CatalogPage />;
}