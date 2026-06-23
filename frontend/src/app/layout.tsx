import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web App',
  description: 'Next.js + NestJS application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
