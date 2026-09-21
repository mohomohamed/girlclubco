'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight, ArrowUpRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb / AliExpress / ASOS / YesStyle.')}`;

  const storePills = [
    { name: 'SHEIN', category: 'Fashion', url: 'https://www.shein.com' },
    { name: 'TEMU', category: 'Home & Gadgets', url: 'https://www.temu.com' },
    { name: 'iHerb', category: 'Skincare', url: 'https://www.iherb.com' },
    { name: 'AliExpress', category: 'Tech', url: 'https://www.aliexpress.com' },
    { name: 'ASOS', category: 'Outfits', url: 'https://www.asos.com' },
    { name: 'YesStyle', category: 'K-Beauty', url: 'https://www.yesstyle.com' },
  ];

  return (
    <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Soft Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/80 text-pink-900 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          <span>Maldives Pre-Order Service</span>
        </div>

        {/* Massive Luxury Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.1]">
          Shop Any Global Store. <br />
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-slate-900 bg-clip-text text-transparent">
            Delivered in MVR.
          </span>
        </h1>

        {/* Clear, Confident Value Proposition */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          No foreign currency card needed. Paste product links from your favorite stores, pay locally in MVR, and we handle overseas freight, Malé customs clearance, and delivery to your door or boat.
        </p>

        {/* Primary High-Impact CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-md hover:scale-105 transition-all duration-150 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Chat on WhatsApp (+960 9964143)</span>
          </a>

          <Link
            href="/order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-md transition-all duration-150"
          >
            <span>Order Online</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Minimalist 6-Store Horizontal Brand Strip */}
        <div className="pt-8 border-t border-slate-200/60 max-w-3xl mx-auto">
          <p className="text-xs text-slate-500 font-medium mb-3">
            Supported International Stores (Weekly Batches):
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {storePills.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition text-slate-800 text-xs font-bold"
              >
                <span>{store.name}</span>
                <span className="text-[10px] text-slate-500 font-normal">({store.category})</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Trust Matrix Checkmarks */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Fixed 15.42 Exchange Rate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>BML & MIB Transfer (MVR)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Doorstep & Boat Drops to All 20 Atolls</span>
          </div>
        </div>

      </div>
    </section>
  );
}
