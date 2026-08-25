'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, ArrowRight, ArrowUpRight, ShieldCheck, Check, Sparkles, Plus, Search, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function HeroSection() {
  const router = useRouter();
  const [quickLink, setQuickLink] = useState('');
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb / AliExpress / ASOS / YesStyle.')}`;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickLink.trim()) {
      // Scroll to order form if on home page or route to /order
      const formEl = document.getElementById('order-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/order');
      }
    } else {
      router.push('/order');
    }
  };

  const storeShowcase = [
    {
      id: 'shein',
      name: 'SHEIN',
      category: 'Fashion & Outfits',
      schedule: 'Tue & Sun',
      accent: 'border-slate-900/20 bg-slate-950 text-white',
      badgeBg: 'bg-slate-800 text-slate-200',
      url: 'https://www.shein.com',
    },
    {
      id: 'temu',
      name: 'TEMU',
      category: 'Home & Gadgets',
      schedule: 'Wed & Sun',
      accent: 'border-orange-500/20 bg-orange-600 text-white',
      badgeBg: 'bg-orange-700 text-orange-100',
      url: 'https://www.temu.com',
    },
    {
      id: 'iherb',
      name: 'iHerb',
      category: 'Skincare & Vitamins',
      schedule: 'Fridays',
      accent: 'border-emerald-500/20 bg-emerald-700 text-white',
      badgeBg: 'bg-emerald-800 text-emerald-100',
      url: 'https://www.iherb.com',
    },
    {
      id: 'aliexpress',
      name: 'AliExpress',
      category: 'Tech & Crafts',
      schedule: 'Tue & Thu',
      accent: 'border-rose-500/20 bg-rose-600 text-white',
      badgeBg: 'bg-rose-700 text-rose-100',
      url: 'https://www.aliexpress.com',
    },
    {
      id: 'asos',
      name: 'ASOS',
      category: 'Outfits & Shoes',
      schedule: 'Fridays',
      accent: 'border-slate-700/20 bg-slate-800 text-white',
      badgeBg: 'bg-slate-900 text-slate-200',
      url: 'https://www.asos.com',
    },
    {
      id: 'yesstyle',
      name: 'YesStyle',
      category: 'K-Beauty Trends',
      schedule: 'Wednesdays',
      accent: 'border-pink-500/20 bg-pink-600 text-white',
      badgeBg: 'bg-pink-700 text-pink-100',
      url: 'https://www.yesstyle.com',
    },
  ];

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Content & Quick-Paste Command Bar */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Monospace Micro-Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-mono tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              <span>Maldives Pre-Order Service</span>
            </div>

            {/* Main Luxury Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.12]">
              Shop Any Global Store. <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-slate-900 bg-clip-text text-transparent">
                Delivered in MVR.
              </span>
            </h1>

            {/* Direct Value Proposition */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              No foreign currency card? Paste product links from <strong>SHEIN, TEMU, iHerb, AliExpress, ASOS & YesStyle</strong>. We handle international freight, customs clearance in Malé, and deliver across the Maldives in local MVR.
            </p>

            {/* Interactive Quick-Paste Link Bar */}
            <form
              onSubmit={handleQuickSubmit}
              className="bg-white p-2 rounded-2xl border border-slate-200 shadow-soft focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent transition flex flex-col sm:flex-row items-center gap-2 max-w-xl"
            >
              <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5 w-full">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={quickLink}
                  onChange={(e) => setQuickLink(e.target.value)}
                  placeholder="Paste item link from SHEIN, TEMU, etc..."
                  className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl transition flex items-center justify-center gap-1.5 flex-shrink-0 shadow-sm"
              >
                <span>Start Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Trust Matrix Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-semibold text-slate-800">Fixed 15.42 Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-semibold text-slate-800">BML / MIB Transfer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-semibold text-slate-800">Doorstep & Boat Handover</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive 6-Store Visual Showcase Deck */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-200/80 shadow-soft space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Supported Store Hub
                </span>
                <Link
                  href="/stores"
                  className="text-[11px] font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                >
                  <span>View All Schedules</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* 6 Store Interactive Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {storeShowcase.map((st) => (
                  <a
                    key={st.id}
                    href={st.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-2xl border border-slate-200/80 hover:border-slate-400 hover:shadow-xs transition group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-slate-900 tracking-tight">{st.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">{st.category}</span>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px]">
                      <span className="font-mono text-slate-400">Batch:</span>
                      <span className="font-bold text-slate-700">{st.schedule}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Live Calculation Preview Chip */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 to-purple-950 text-white flex items-center justify-between text-xs shadow-sm">
                <div>
                  <span className="text-[10px] font-mono text-pink-300 block">Sample Cart: $25.00 USD</span>
                  <span className="font-serif-luxury font-bold text-sm text-white">MVR 470.50 Delivered</span>
                </div>
                <Link
                  href="/order"
                  className="bg-pink-600 hover:bg-pink-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                >
                  Calculate Now
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
