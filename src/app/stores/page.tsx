import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, ShoppingBag, ArrowRight, MessageCircle, Calendar, Sparkles, Layers, Check } from 'lucide-react';
import { SITE_CONFIG, STORES } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Stores & Brands — SHEIN, TEMU, iHerb, AliExpress, ASOS & YesStyle | GirlClub Maldives',
  description: 'Shop popular international online stores with assisted pre-order service and delivery across Maldives in MVR.',
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
    },
  ];

  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
          <Store className="w-3.5 h-3.5 text-pink-600" />
          <span>Supported Stores</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Shop Top International Stores
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          We handle ordering, international air/sea freight, and Malé customs clearance. Pay conveniently in MVR via BML or MIB.
        </p>
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

              {/* Action */}
              <div className="pt-2">
                <Link
                  href="/order"
                  className={`w-full inline-flex items-center justify-center gap-1.5 ${st.btnColor} text-white text-xs font-bold py-3 px-4 rounded-xl transition shadow-sm`}
                >
                  <span>Order {st.name} Items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mixed Store Orders Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-300 bg-white/10 px-3 py-0.5 rounded-full">
              <Layers className="w-3.5 h-3.5" /> All-in-One Order
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold">
              Want to combine items from different stores?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Paste links from SHEIN, TEMU, iHerb, AliExpress, ASOS, and YesStyle together into one single consolidated pre-order!
            </p>
          </div>

          <Link
            href="/order"
            className="flex-shrink-0 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
          >
            Start Mixed Order
          </Link>
        </div>
      </div>
    </div>
  );
}
