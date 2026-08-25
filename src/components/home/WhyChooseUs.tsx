'use client';

import React from 'react';
import { ShieldCheck, CreditCard, Ship, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: CreditCard,
      title: 'No International Card Limits',
      desc: 'Never worry about bank monthly dollar caps or rejected foreign payments. Pay conveniently in local MVR via BML or MIB transfer.',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      icon: ShieldCheck,
      title: 'Customs & Clearance Handled',
      desc: 'Zero import paperwork or customs stress. We manage international air/sea freight, parcel consolidation, and Malé port clearance.',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: Ship,
      title: 'Nationwide Maldives Delivery',
      desc: 'Doorstep drops across Malé and Hulhumalé, plus direct cargo boat and courier handover at Malé harbor for all 20 atolls.',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: RefreshCw,
      title: '100% Refund Protection',
      desc: 'If any item goes out of stock or cannot be fulfilled before checkout, we provide an immediate 100% refund in MVR to your account.',
      color: 'bg-rose-100 text-rose-700',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Why Shop With Us</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-slate-900">
            Shopping Made Effortless
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Built specifically for shoppers in the Maldives to access global fashion, home finds & beauty with total peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-pink-200 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center mb-4 shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
