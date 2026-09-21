'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ShieldCheck, CreditCard, Clock, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function SimpleFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the assisted ordering process work?',
      a: 'Browse SHEIN, TEMU, iHerb, AliExpress, ASOS, or YesStyle, copy your product links, and paste them into our Order form or send them directly to WhatsApp (+960 9964143). Our team manually verifies product availability, sizes, and exact prices before sending your BML/MIB transfer confirmation.',
    },
    {
      q: 'How do I pay in MVR? Is it bank transfer only?',
      a: `Yes, payment is strictly via local bank transfer in MVR to our Bank of Maldives (BML: ${SITE_CONFIG.bmlAccount}) or Maldives Islamic Bank (MIB: ${SITE_CONFIG.mibAccount}) account. No international bank card or USD currency is needed!`,
    },
    {
      q: 'Can I combine items from different stores in one order?',
      a: 'Yes! You can combine clothing from SHEIN/ASOS, gadgets from TEMU/AliExpress, and skincare from iHerb/YesStyle into one consolidated order.',
    },
    {
      q: 'How long does delivery take to arrive in the Maldives?',
      a: 'Estimated transit is generally 10 to 18 business days from the scheduled store batch date. Once cleared at Malé customs, we arrange immediate doorstep delivery or boat handover.',
    },
    {
      q: 'Where do you deliver in the Maldives?',
      a: 'We offer free self-collection in Malé, doorstep delivery across Malé (+MVR 35) and Hulhumalé (+MVR 45), and direct handover to island cargo boats and couriers at Malé harbor (+MVR 75) for all 20 atolls.',
    },
    {
      q: 'What happens if an item goes out of stock?',
      a: 'If any product becomes out of stock or cannot be fulfilled before checkout, we notify you immediately on WhatsApp and provide a 100% instant refund in MVR back to your bank account.',
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
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Need more details? Check our{' '}
            <Link href="/terms" className="text-pink-600 font-semibold underline hover:text-pink-700">
              Terms & Conditions
            </Link>
          </p>
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
