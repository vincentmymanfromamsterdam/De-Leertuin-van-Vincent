import type { Metadata, Viewport } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import { config } from '@/lib/config';

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: config.brand.name,
  description: config.brand.tagline,
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: config.brand.name,
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/icons/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f4' },
    { media: '(prefers-color-scheme: dark)', color: '#111110' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={config.languages.primary} className={serif.variable}>
      <body>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
