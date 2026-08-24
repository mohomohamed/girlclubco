'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import QuickCalculator from '@/components/calculator/QuickCalculator';
import SimpleSteps from '@/components/home/SimpleSteps';
import SimpleFAQ from '@/components/home/SimpleFAQ';
import { Store, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, CreditCard, MessageCircle, Layers } from 'lucide-react';
import { SITE_CONFIG, STORES } from '@/lib/config';

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb.')}`;

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Multi-Link Order Builder & Calculator */}
      <QuickCalculator />

      {/* 3. Stores Showcase Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-pink-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full inline-block">
                All-in-One Assisted Shopping
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                Order from SHEIN, TEMU & iHerb in One Go!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Combine fashion items from SHEIN, gadgets from TEMU, and Korean skincare from iHerb into a single consolidated order delivered to your door or boat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                href="/order"
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Build Multi-Link Order</span>
              </Link>
              <Link
                href="/stores"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition border border-white/20"
              >
                View Stores Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3 Simple Steps */}
      <SimpleSteps />

      {/* 5. Common Questions */}
      <SimpleFAQ />
    </div>
  );
}
