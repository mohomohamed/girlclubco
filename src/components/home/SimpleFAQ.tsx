'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CreditCard, Clock, MapPin, RefreshCw } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function SimpleFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is the MVR total calculated?',
      a: `We use the official fixed bank exchange rate of USD 1 = MVR ${SITE_CONFIG.fixedExchangeRate.toFixed(2)}. Your cart total in USD is converted at MVR ${SITE_CONFIG.fixedExchangeRate.toFixed(2)}, plus a transparent ${SITE_CONFIG.commissionPercentage}% service commission (minimum MVR ${SITE_CONFIG.minimumCommissionMvr}) and any applicable local delivery fee.`,
    },
    {
      q: 'How do I pay in MVR?',
      a: `Payment is made 100% in MVR via local mobile bank transfer to our Bank of Maldives (BML: ${SITE_CONFIG.bmlAccount}) or Maldives Islamic Bank (MIB: ${SITE_CONFIG.mibAccount}) accounts. No international debit or credit card needed!`,
    },
    {
      q: 'How long does delivery take to arrive in Maldives?',
      a: 'Estimated delivery is generally 10 to 18 days from the scheduled batch order day. Once cleared at Malé customs, we arrange immediate collection or delivery.',
    },
    {
      q: 'Where do you deliver in Maldives?',
      a: 'We provide doorstep delivery across Malé and Hulhumalé (Phase 1 & 2), and we drop parcels directly to island boats and harbor couriers for islands throughout the Maldives.',
    },
    {
      q: 'What if an item in my cart goes out of stock?',
      a: 'If any product becomes unavailable before checkout, we will immediately inform you and refund the exact MVR amount back to your bank account.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-pink-600" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 hover:bg-pink-50/40 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-pink-600 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
