'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function SimpleSteps() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to inquire about placing an order.')}`;

  const steps = [
    {
      num: '01',
      title: 'Find Your Products',
      desc: 'Browse SHEIN, TEMU, iHerb, AliExpress, ASOS, or YesStyle and copy the product links.',
      icon: ShoppingBag,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      num: '02',
      title: 'Paste Links & Calculate',
      desc: 'Add your links in our Order form to auto-scan details, see your MVR total, and click Send on WhatsApp.',
      icon: MessageCircle,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      num: '03',
      title: 'Pay in MVR & Receive',
      desc: 'Confirm order and transfer in MVR via BML or MIB. We clear customs and deliver to your doorstep or boat.',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>3 Simple Steps</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-slate-900">
            How Pre-Ordering Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Shopping from global stores has never been easier in the Maldives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-100/80 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-2xl text-pink-300">
                      {s.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout */}
        <div className="mt-10 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold">
            Have questions or links ready? Chat on WhatsApp!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
            Our team is online 7 days a week to review your links and calculate your total in MVR.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-800" />
              <span>Chat on WhatsApp (+960 9964143)</span>
            </a>

            <Link
              href="/order"
              className="inline-flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full border border-emerald-500/40 transition"
            >
              <span>Go to Order Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
