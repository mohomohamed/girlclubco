'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ShoppingBag, MessageCircle, CreditCard, Truck, Check, Copy, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function HowItWorksPage() {
  const [copiedBank, setCopiedBank] = useState<'bml' | 'mib' | null>(null);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to inquire about ordering.')}`;

  const copyBank = (type: 'bml' | 'mib') => {
    const acc = type === 'bml' ? SITE_CONFIG.bmlAccount : SITE_CONFIG.mibAccount;
    navigator.clipboard.writeText(acc);
    setCopiedBank(type);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'Shop on SHEIN, TEMU, or iHerb',
      desc: 'Open the store app or website, browse what you love, and prepare your cart or copy individual product links.',
      icon: ShoppingBag,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      num: '02',
      title: 'Send Cart Links to WhatsApp',
      desc: 'Use our Multi-Link Order Builder or simply share your cart link, screenshots, and sizes to our WhatsApp (+960 7614170).',
      icon: MessageCircle,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      num: '03',
      title: 'Pay in MVR via BML or MIB',
      desc: 'Transfer the MVR total to our Bank of Maldives or Maldives Islamic Bank account. Once verified, your order is placed immediately.',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      num: '04',
      title: 'Receive in Malé or Island Boat',
      desc: 'Track your shipment progress. We clear customs and deliver to your doorstep in Malé/Hulhumalé or drop directly to your island boat.',
      icon: Truck,
      color: 'bg-rose-100 text-rose-600',
    },
  ];

  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-pink-600" />
          <span>Simple Guided Process</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          How Assisted Shopping Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          From cart selection to doorstep delivery in the Maldives — we make international shopping seamless and accessible in MVR.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="bg-white rounded-3xl p-6 border border-pink-100/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-extrabold text-2xl text-pink-300">
                    {s.num}
                  </span>
                  <div className={`w-11 h-11 rounded-2xl ${s.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Maldives Payment & Delivery Coverage */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment via BML / MIB */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <CreditCard className="w-5 h-5 text-pink-600" />
            <h3 className="font-serif-luxury text-xl font-bold">Local Bank Transfer (MVR)</h3>
          </div>
          <p className="text-xs text-slate-600">
            All payments are collected in MVR via local bank transfer. No foreign exchange or international debit card fees:
          </p>

          <div className="space-y-2.5 pt-2">
            {/* BML */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-pink-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-rose-700 block">Bank of Maldives (BML)</span>
                <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">{SITE_CONFIG.bmlAccount}</span>
              </div>
              <button
                type="button"
                onClick={() => copyBank('bml')}
                className="px-3 py-1.5 bg-white hover:bg-pink-50 text-pink-700 text-xs font-semibold rounded-lg border border-pink-200 shadow-sm transition"
              >
                {copiedBank === 'bml' ? 'Copied!' : 'Copy BML'}
              </button>
            </div>

            {/* MIB */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 block">Maldives Islamic Bank (MIB)</span>
                <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">{SITE_CONFIG.mibAccount}</span>
              </div>
              <button
                type="button"
                onClick={() => copyBank('mib')}
                className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 shadow-sm transition"
              >
                {copiedBank === 'mib' ? 'Copied!' : 'Copy MIB'}
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Coverage */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif-luxury text-xl font-bold">Maldives Delivery Coverage</h3>
          </div>
          <p className="text-xs text-slate-600">
            We ensure safe arrival and fast handover across all regions in the Maldives:
          </p>

          <div className="space-y-2 text-xs text-slate-700 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 border flex justify-between items-center">
              <span><strong>Self-Collection:</strong> Malé / Hulhumalé Hub</span>
              <span className="font-bold text-emerald-700">FREE</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border flex justify-between items-center">
              <span><strong>Malé Doorstep:</strong> Delivered to your apartment</span>
              <span className="font-bold text-slate-900">+MVR 35</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border flex justify-between items-center">
              <span><strong>Hulhumalé Phase 1 & 2:</strong> Doorstep delivery</span>
              <span className="font-bold text-slate-900">+MVR 45</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border flex justify-between items-center">
              <span><strong>Island Boats & Cargo:</strong> Malé harbor boat drops</span>
              <span className="font-bold text-slate-900">+MVR 75</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href="/order"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 transition"
        >
          <span>Open Multi-Link Order Builder</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
