import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import MobileNav from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'GirlClub Maldives — SHEIN • TEMU • iHerb Assisted Shopping Service',
  description: 'Shop SHEIN, TEMU & iHerb in the Maldives at the fixed rate of USD 1 = MVR 15.42. Pay in MVR via BML or MIB. Send your cart links to WhatsApp +960 7614170.',
  keywords: ['SHEIN Maldives', 'TEMU Maldives', 'iHerb Maldives', 'Assisted shopping Maldives', 'Online shopping MVR', 'GirlClub Maldives'],
  openGraph: {
    title: 'GirlClub Maldives — Shop SHEIN, TEMU & iHerb in MVR',
    description: 'Fixed rate USD 1 = MVR 15.42 + 12% commission. Send your cart links on WhatsApp and pay in MVR.',
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
      <body className="min-h-screen flex flex-col antialiased bg-[#FAFAFC] text-slate-900 selection:bg-pink-500 selection:text-white pb-16 lg:pb-0">
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
