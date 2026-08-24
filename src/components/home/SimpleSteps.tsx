'use client';

import React from 'react';
import { ShoppingBag, MessageCircle, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function SimpleSteps() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb.')}`;

  const steps = [
    {
      num: '01',
      title: 'Shop & Fill Your Cart',
      desc: 'Browse directly on SHEIN, TEMU, or iHerb and copy your product links or cart link.',
      icon: ShoppingBag,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      num: '02',
      title: 'Send Links on WhatsApp',
      desc: 'Add your product links in our builder and click Send to WhatsApp (+960 7614170).',
      icon: MessageCircle,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      num: '03',
      title: 'Pay in MVR & Receive',
      desc: 'Transfer in MVR via BML or MIB. We place your order, clear customs, and deliver to your door or boat.',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>3 Simple Steps</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Shopping from international stores has never been easier in the Maldives.
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
                    <span className="font-mono font-extrabold text-2xl text-pink-300">
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
            Ready to order? Send your links to +960 7614170!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
            Our team is ready to calculate your exact total and guide you through payment and delivery.
          </p>
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm px-7 py-3 rounded-full shadow-md hover:scale-105 transition"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-800" />
              <span>Chat on WhatsApp (+960 7614170)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
