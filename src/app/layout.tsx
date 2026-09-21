import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import MobileNav from '@/components/layout/MobileNav';

export const viewport: Viewport = {
  themeColor: '#ec4899',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'GirlClub Maldives — SHEIN • TEMU • iHerb Assisted Shopping Service',
  description: 'Shop SHEIN, TEMU & iHerb in the Maldives. Pay locally in MVR via BML or MIB (Transfer only). Send your cart links on WhatsApp +960 9964143.',
  keywords: ['SHEIN Maldives', 'TEMU Maldives', 'iHerb Maldives', 'Assisted shopping Maldives', 'Online shopping MVR', 'GirlClub Maldives'],
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'GirlClub Maldives — Shop SHEIN, TEMU & iHerb in MVR',
    description: 'Shop international brands with doorstep delivery across Maldives. Pay in MVR via BML or MIB.',
    url: 'https://girlclub.mv',
    siteName: 'GirlClub Maldives',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-[#FAFAFC] text-slate-900 selection:bg-pink-500 selection:text-white pb-20 md:pb-0">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FloatingWhatsApp />
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
