import React from 'react';
import type { Metadata } from 'next';
import QuickCalculator from '@/components/calculator/QuickCalculator';
import { Sparkles, ShieldCheck, MessageCircle, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Order Builder — GirlClub Maldives (SHEIN • TEMU • iHerb)',
  description: 'Add multiple product links, sizes, and colors. Calculate your exact MVR total and send directly to WhatsApp +960 7614170.',
};

export default function OrderPage() {
  return (
    <div className="py-6 sm:py-10">
      {/* Top Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border border-pink-200/80 rounded-3xl p-5 sm:p-6 text-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-pink-700 bg-pink-100/80 px-2.5 py-0.5 rounded-full inline-block">
              Assisted Shopping Order Portal
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900">
              Multi-Link Order Builder
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Paste product links from SHEIN, TEMU, or iHerb below to compile your order.
            </p>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to inquire about ordering.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Need Help? Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Order Builder & Calculator */}
      <QuickCalculator />

      {/* Helpful Order Tips */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Tips for Faster Checkout</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">1. Specify Sizes & Colors</strong>
              <p>Be sure to add your size (e.g. Size M, EUR 38) and preferred color shade for each link.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">2. Share Cart Screenshot</strong>
              <p>You can also send a screenshot of your app cart directly in the WhatsApp chat.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">3. Bank Transfer Slip</strong>
              <p>Transfer via BML or MIB and send the transfer slip to confirm and queue your order.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
