import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AUREON Commerce OS',
  description: 'Inteligência para dropshipping, infoprodutos e marketing digital.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
