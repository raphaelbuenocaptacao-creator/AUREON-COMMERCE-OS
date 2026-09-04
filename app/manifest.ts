import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'AUREON Commerce OS',
    short_name: 'AUREON',
    description: 'Inteligência para dropshipping, infoprodutos e marketing digital.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0b0b',
    theme_color: '#0b0b0b',
    lang: 'pt-BR',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
