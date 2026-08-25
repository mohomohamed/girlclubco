'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, Store, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function MobileNav() {
  const pathname = usePathname();
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb.')}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-100 px-3 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-semibold transition py-1 ${
            pathname === '/' ? 'text-pink-600 font-bold' : 'text-slate-600 hover:text-pink-600'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>

        {/* Center Action: Order */}
        <Link
          href="/order"
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/35 group-hover:scale-105 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-extrabold text-pink-600 mt-0.5">Order</span>
        </Link>

        <Link
          href="/stores"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-semibold transition py-1 ${
            pathname === '/stores' ? 'text-pink-600 font-bold' : 'text-slate-600 hover:text-pink-600'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Stores</span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition py-1"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
