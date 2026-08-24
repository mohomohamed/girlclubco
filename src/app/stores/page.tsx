import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, ShoppingBag, Sparkles, ArrowRight, MessageCircle, Calendar, CheckCircle2, Layers } from 'lucide-react';
import { SITE_CONFIG, STORES } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Stores & Brands — SHEIN, TEMU & iHerb in Maldives | GirlClub',
  description: 'Shop international fashion from SHEIN, home finds from TEMU, and wellness from iHerb with local Maldives delivery.',
};

export default function StoresPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb.')}`;

  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
          <Store className="w-3.5 h-3.5 text-pink-600" />
          <span>Supported Platforms</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Shop Your Favorite International Stores
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          We consolidate pre-orders from SHEIN, TEMU, and iHerb directly to the Maldives with zero international debit card hassle.
        </p>
      </div>

      {/* Stores Showcase Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* SHEIN */}
        <div id="shein" className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-soft scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">SHEIN</h2>
                  <span className="text-[11px] font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full">
                    Fashion & Beauty
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dresses, casual wear, shoes, activewear, bags, swimwear & makeup.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
              >
                <span>Order SHEIN Items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs text-slate-600">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">📅 Order Schedule</span>
              <p>Batches placed <strong>2x weekly</strong> (Tuesdays & Sundays 8:00 PM).</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">📦 Delivery Coverage</span>
              <p>Doorstep in Malé / Hulhumalé & Island Boat cargo.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">✈️ Estimated Arrival</span>
              <p>Generally <strong>10 to 16 days</strong> from order placement.</p>
            </div>
          </div>
        </div>

        {/* TEMU */}
        <div id="temu" className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-soft scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                T
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">TEMU</h2>
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">
                    Home & Lifestyle
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Home organizers, kitchen gadgets, decor, craft accessories & stationery.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
              >
                <span>Order TEMU Items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs text-slate-600">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">📅 Order Schedule</span>
              <p>Batches placed <strong>2x weekly</strong> (Wednesdays & Sundays 8:00 PM).</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">📦 Delivery Coverage</span>
              <p>Doorstep in Malé / Hulhumalé & Island Boat cargo.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">✈️ Estimated Arrival</span>
              <p>Generally <strong>12 to 18 days</strong> to Maldives.</p>
            </div>
          </div>
        </div>

        {/* iHerb */}
        <div id="iherb" className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-soft scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                🌿
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif-luxury text-2xl font-bold text-slate-900">iHerb</h2>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Wellness & Skincare
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Korean skincare, sunscreen, collagen, vitamins, supplements & organic tea.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
              >
                <span>Order iHerb Items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs text-slate-600">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">📅 Order Schedule</span>
              <p>Batches placed <strong>weekly</strong> (Every Friday 6:00 PM).</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">📦 Delivery Coverage</span>
              <p>Doorstep in Malé / Hulhumalé & Island Boat cargo.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">✈️ Estimated Arrival</span>
              <p>Fast air cargo in <strong>10 to 14 days</strong>.</p>
            </div>
          </div>
        </div>

        {/* Mixed Store Orders Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-300 bg-white/10 px-3 py-0.5 rounded-full">
              <Layers className="w-3.5 h-3.5" /> All-in-One Checkout
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold">
              Want to combine items from all 3 stores?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Use our Multi-Link Builder to add SHEIN clothes, TEMU gadgets, and iHerb supplements into one unified order.
            </p>
          </div>

          <Link
            href="/order"
            className="flex-shrink-0 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
          >
            Create Mixed Order
          </Link>
        </div>
      </div>
    </div>
  );
}
