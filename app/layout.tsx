import type { Metadata, Viewport } from 'next';
import './globals.css';
import PwaRegister from './pwa-register';

export const metadata: Metadata = {
  title: 'AUREON Commerce OS',
  description: 'Inteligência para dropshipping, infoprodutos e marketing digital.',
  applicationName: 'AUREON Commerce OS',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
