import '@/styles/globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sstringz Pearls — Catalogue',
  description: 'Fast PWA catalogue for Pearls (B2C + B2B)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1 container py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
