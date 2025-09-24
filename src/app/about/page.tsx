import type { Metadata } from 'next';
import { generateAboutMetadata } from '@/lib/seo-utils';
import AboutPage from './AboutPage';

export async function generateMetadata(): Promise<Metadata> {
  return await generateAboutMetadata();
}

export default function AboutPageWrapper() {
  return <AboutPage />;
} 