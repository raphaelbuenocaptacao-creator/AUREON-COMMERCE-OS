import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const at = (path: string) => `${basePath}${path}` || '/';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: at('/'),
    name: 'AUREON Commerce OS',
    short_name: 'AUREON',
    description: 'Inteligência para dropshipping, infoprodutos e marketing digital.',
    start_url: at('/'),
    scope: at('/'),
    display: 'standalone',
    background_color: '#0b0b0b',
    theme_color: '#0b0b0b',
    lang: 'pt-BR',
    categories: ['business', 'productivity'],
    icons: [
      { src: at('/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: at('/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: at('/icon-512-maskable.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
