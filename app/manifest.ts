import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AUREON Commerce OS',
    short_name: 'AUREON',
    description: 'Inteligência para dropshipping, infoprodutos e marketing digital.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0b0b',
    theme_color: '#0b0b0b',
    lang: 'pt-BR',
    categories: ['business', 'productivity'],
  };
}
