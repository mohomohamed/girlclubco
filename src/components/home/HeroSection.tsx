'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { SITE_CONFIG, STORES } from '@/lib/config';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb.')}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Soft Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-pink-200/40 via-purple-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Assisted International Shopping • Maldives</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.18]">
          Shop <span className="text-pink-600">SHEIN</span>,{' '}
          <span className="text-orange-600">TEMU</span> &{' '}
          <span className="text-emerald-700">iHerb</span> with Ease.
        </h1>

        {/* Direct value proposition without dollar rate spam */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          No international bank card? Simply send us your cart or product links on <strong>WhatsApp</strong>, pay conveniently in <strong>MVR</strong> via BML or MIB, and we deliver right to your door.
        </p>

        {/* Big High-Converting Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-700/25 hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Send Your Cart on WhatsApp</span>
          </a>

          <Link
            href="/order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-6 py-4 rounded-full border border-slate-200 shadow-sm transition"
          >
            <span>Open Order Builder</span>
            <ArrowRight className="w-4 h-4 text-pink-600" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Card Hassle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pay in MVR (BML / MIB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Doorstep & Island Boat Delivery</span>
          </div>
        </div>

        {/* Store Highlight Cards - Clean & Focused on Frequency, not rate spam */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          {/* SHEIN */}
          <Link href="/stores#shein" className="bg-white rounded-2xl p-5 border border-pink-100 shadow-soft hover:border-pink-300 transition group">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 uppercase">SHEIN</span>
              <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                2x Weekly Batches
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Fashion, dresses, glam & accessories</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-pink-600 font-semibold group-hover:underline">
              <span>View store schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* TEMU */}
          <Link href="/stores#temu" className="bg-white rounded-2xl p-5 border border-orange-100 shadow-soft hover:border-orange-300 transition group">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 uppercase">TEMU</span>
              <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                2x Weekly Batches
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Home organization, kitchen & lifestyle</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-orange-600 font-semibold group-hover:underline">
              <span>View store schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* iHerb */}
          <Link href="/stores#iherb" className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-soft hover:border-emerald-300 transition group">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 uppercase">iHerb</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Weekly Batches
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Korean skincare, vitamins & wellness</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold group-hover:underline">
              <span>View store schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
