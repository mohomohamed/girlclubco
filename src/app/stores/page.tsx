import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, ShoppingBag, ArrowUpRight, ArrowRight, MessageCircle, Calendar, Sparkles, Layers, ExternalLink } from 'lucide-react';
import { SITE_CONFIG, STORES } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Stores & Brands — SHEIN, TEMU, iHerb, AliExpress, ASOS & YesStyle | GirlClub Maldives',
  description: 'Browse official international store websites, copy your favorite product links, and let GirlClub deliver them across Maldives in local MVR.',
};

export default function StoresPage() {
  const storeList = [
    {
      id: 'shein',
      name: 'SHEIN',
      badge: 'Fashion & Outfits',
      desc: 'Trending dresses, modest wear, casual sets, shoes, bags, activewear & accessories.',
      schedule: 'Tuesdays & Sundays (8:00 PM)',
      transit: '10 to 14 Days',
      color: 'bg-slate-900 text-white',
      btnColor: 'bg-slate-900 hover:bg-slate-800',
      tagColor: 'bg-slate-100 text-slate-800',
      initial: 'S',
      externalUrl: 'https://www.shein.com',
    },
    {
      id: 'temu',
      name: 'TEMU',
      badge: 'Home & Lifestyle',
      desc: 'Home organization, viral kitchen tools, stationery, room decor & smart gadgets.',
      schedule: 'Wednesdays & Sundays (8:00 PM)',
      transit: '12 to 16 Days',
      color: 'bg-orange-600 text-white',
      btnColor: 'bg-orange-600 hover:bg-orange-500',
      tagColor: 'bg-orange-50 text-orange-800',
      initial: 'T',
      externalUrl: 'https://www.temu.com',
    },
    {
      id: 'iherb',
      name: 'iHerb',
      badge: 'Skincare & Wellness',
      desc: 'Korean skincare (COSRX, Beauty of Joseon), CeraVe, vitamins, supplements & organic tea.',
      schedule: 'Every Friday (6:00 PM)',
      transit: '8 to 12 Days',
      color: 'bg-emerald-700 text-white',
      btnColor: 'bg-emerald-700 hover:bg-emerald-600',
      tagColor: 'bg-emerald-50 text-emerald-800',
      initial: '🌿',
      externalUrl: 'https://www.iherb.com',
    },
    {
      id: 'aliexpress',
      name: 'AliExpress',
      badge: 'Tech & Accessories',
      desc: 'Phone cases, Apple Watch straps, jewelry, DIY crafting supplies, tools & party decor.',
      schedule: 'Tuesdays & Thursdays (8:00 PM)',
      transit: '14 to 20 Days',
      color: 'bg-rose-600 text-white',
      btnColor: 'bg-rose-600 hover:bg-rose-500',
      tagColor: 'bg-rose-50 text-rose-800',
      initial: '📦',
      externalUrl: 'https://www.aliexpress.com',
    },
    {
      id: 'asos',
      name: 'ASOS',
      badge: 'Premium Fashion & Shoes',
      desc: 'Wedding guest dresses, Eid sets, modest fashion, Topshop & branded sneakers (Nike, New Balance).',
      schedule: 'Every Friday (8:00 PM)',
      transit: '10 to 14 Days',
      color: 'bg-slate-800 text-white',
      btnColor: 'bg-slate-800 hover:bg-slate-700',
      tagColor: 'bg-slate-100 text-slate-800',
      initial: '👗',
      externalUrl: 'https://www.asos.com',
    },
    {
      id: 'yesstyle',
      name: 'YesStyle',
      badge: 'K-Beauty & Aesthetic Fashion',
      desc: 'Viral Korean sunscreens, toner pads, Asian cosmetics & aesthetic lifestyle clothing.',
      schedule: 'Every Wednesday (8:00 PM)',
      transit: '10 to 15 Days',
      color: 'bg-pink-600 text-white',
      btnColor: 'bg-pink-600 hover:bg-pink-500',
      tagColor: 'bg-pink-50 text-pink-800',
      initial: '💄',
      externalUrl: 'https://www.yesstyle.com',
    },
  ];

  return (
    <div className="py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
          <Store className="w-3.5 h-3.5 text-pink-600" />
          <span>Supported Stores</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Browse & Shop Official Stores
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Click any store below to browse products on their official site. Copy the link of any item you like and paste it in our <strong>Order</strong> tab!
        </p>
      </div>

      {/* 3-Step Micro Guide */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-pink-50/70 border border-pink-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">
              1
            </span>
            <span className="font-semibold text-slate-800">Browse official store ↗</span>
          </div>
          <div className="hidden sm:block text-pink-300 font-bold">→</div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">
              2
            </span>
            <span className="font-semibold text-slate-800">Copy the product link</span>
          </div>
          <div className="hidden sm:block text-pink-300 font-bold">→</div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">
              3
            </span>
            <Link href="/order" className="font-bold text-pink-700 underline underline-offset-2 hover:text-pink-800">
              Paste in Order tab
            </Link>
          </div>
        </div>
      </div>

      {/* Stores Showcase Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storeList.map((st) => (
            <div
              key={st.id}
              id={st.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between scroll-mt-24 space-y-5"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${st.color} flex items-center justify-center font-extrabold text-base shadow-sm`}>
                      {st.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif-luxury text-xl font-bold text-slate-900">{st.name}</h2>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.tagColor}`}>
                          {st.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3.5">
                  {st.desc}
                </p>

                {/* Logistics Info */}
                <div className="grid grid-cols-2 gap-2.5 pt-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block text-[11px] mb-0.5">📅 Batch Schedule</span>
                    <p className="text-[11px] text-slate-600">{st.schedule}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block text-[11px] mb-0.5">✈️ Transit to Maldives</span>
                    <p className="text-[11px] text-slate-600">{st.transit}</p>
                  </div>
                </div>
              </div>

              {/* Action: Open official store website in new tab */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={st.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 ${st.btnColor} text-white text-xs font-bold py-3 px-4 rounded-xl transition shadow-sm hover:scale-[1.01] active:scale-95`}
                >
                  <span>Shop on {st.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  href="/order"
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>Order Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Ready to order banner */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-300 bg-white/10 px-3 py-0.5 rounded-full">
              <Layers className="w-3.5 h-3.5" /> Ready to Order?
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold">
              Got your links ready?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Paste your links into our multi-link order form, calculate your total in MVR, and dispatch directly to WhatsApp!
            </p>
          </div>

          <Link
            href="/order"
            className="flex-shrink-0 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
          >
            Go to Order Form
          </Link>
        </div>
      </div>
    </div>
  );
}
