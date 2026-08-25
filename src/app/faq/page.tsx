import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, MessageCircle, ArrowRight, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — GirlClub Maldives',
  description: 'Common questions about assisted shopping from SHEIN, TEMU, iHerb, AliExpress, ASOS, and YesStyle with MVR BML/MIB payment.',
};

export default function FAQPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I have a question regarding assisted ordering.')}`;

  const faqs = [
    {
      q: 'How does the assisted pre-ordering process work?',
      a: 'Browse SHEIN, TEMU, iHerb, AliExpress, ASOS, or YesStyle on your phone or computer. Copy the product links, specify your sizes/quantities, and submit them in our Order form or send them directly to WhatsApp (+960 7614170). Our team manually verifies item availability, stock status, and exact prices before sending your official BML/MIB transfer confirmation.',
    },
    {
      q: 'How do I pay? Is it local bank transfer only?',
      a: `Yes, payment is strictly via local bank transfer in MVR to our Bank of Maldives (BML: ${SITE_CONFIG.bmlAccount}) or Maldives Islamic Bank (MIB: ${SITE_CONFIG.mibAccount}) account. No international credit card or USD foreign currency is needed!`,
    },
    {
      q: 'Can I combine items from different stores in one order?',
      a: 'Yes! You can combine clothing from SHEIN or ASOS, gadgets from TEMU or AliExpress, and skincare from iHerb or YesStyle into one consolidated order inquiry. They will be placed according to each store’s weekly batch schedule and delivered to you.',
    },
    {
      q: 'What is the exchange rate and commission?',
      a: `All USD prices are converted at the fixed exchange rate of USD 1 = MVR ${SITE_CONFIG.fixedExchangeRate.toFixed(2)}. We charge a ${SITE_CONFIG.commissionPercentage}% service commission (minimum MVR ${SITE_CONFIG.minimumCommissionMvr}) to cover international order processing, currency arrangement, and customs logistics.`,
    },
    {
      q: 'How long does delivery take to arrive in the Maldives?',
      a: 'Standard delivery to Malé typically takes 10 to 18 business days from the scheduled batch order date. We take care of international freight and Maldives customs clearance.',
    },
    {
      q: 'Where do you deliver in the Maldives?',
      a: 'We provide free self-collection in Malé, doorstep delivery across Malé (+MVR 35) and Hulhumalé (+MVR 45), and direct handover to island cargo boats and couriers at Malé harbor (+MVR 75) for all 20 atolls.',
    },
    {
      q: 'What happens if an item goes out of stock?',
      a: 'If any item goes out of stock before checkout, we notify you immediately on WhatsApp. You can choose a replacement link or receive an immediate 100% refund in MVR back to your original bank account.',
    },
    {
      q: 'Are there any prohibited items you cannot order?',
      a: 'In compliance with Maldives Customs Service regulations and airline air-freight safety laws, we cannot order pork products, alcoholic beverages, items contrary to Islamic tenets, weapons/replicas, or pressurized aerosol flammables.',
    },
  ];

  return (
    <div className="py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-800 text-xs font-semibold border border-pink-200/60">
          <HelpCircle className="w-3.5 h-3.5 text-pink-600" />
          <span>Help & Support</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Everything you need to know about assisted pre-orders, batch delivery schedules, and payment policies in the Maldives.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft space-y-2"
          >
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-start gap-2">
              <span className="text-pink-600 font-serif-luxury font-extrabold">{idx + 1}.</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* WhatsApp Help CTA Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-lg">
          <div className="space-y-1">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Chat directly with our customer support team on WhatsApp (+960 7614170) anytime.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition flex items-center gap-2 flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
