
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
      name: 'SVB SHOP - ТВ без подписок - Smart TV приставки',
  short_name: 'SVB SHOP - ТВ без подписок',
    description: 'Smart TV приставки для комфортного просмотра контента',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 