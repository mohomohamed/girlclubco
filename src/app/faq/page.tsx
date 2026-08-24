import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, MessageCircle, ArrowRight, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — GirlClub Maldives',
  description: 'Common questions about ordering from SHEIN, TEMU, and iHerb in Maldives with BML / MIB payment.',
};

export default function FAQPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I have a question.')}`;

  const faqs = [
    {
      q: 'How does the assisted ordering process work?',
      a: 'Browse SHEIN, TEMU, or iHerb on your phone or computer. Copy the product links or cart link, specify your sizes and quantities, and send them to us on WhatsApp (+960 7614170). Our team will manually evaluate your cart for item availability, price accuracy, and stock before sending you a final order confirmation with BML/MIB transfer details.',
    },
    {
      q: 'How do I pay? Is it bank transfer only?',
      a: 'Yes, payment is strictly through local bank transfer (Bank of Maldives BML or Maldives Islamic Bank MIB). No international card or USD account is needed. Full payment in MVR is required before orders are confirmed and placed.',
    },
    {
      q: 'Can I combine items from SHEIN, TEMU, and iHerb in one order?',
      a: 'Yes! Our Multi-Link Order Builder allows you to combine items from all three stores into one order inquiry. They will be ordered according to each store’s weekly batch schedule and delivered to you.',
    },
    {
      q: 'How long does delivery take to the Maldives?',
      a: 'Delivery to Malé typically takes 10 to 18 business days from the batch order date. We take care of international air shipping and Maldives customs clearance.',
    },
    {
      q: 'Do you deliver to Hulhumalé and island boats?',
      a: 'Yes! We provide doorstep delivery in Malé (+MVR 35) and Hulhumalé (+MVR 45), free self-collection at our hub, and direct handover to island cargo boats in Malé harbor (+MVR 75).',
    },
    {
      q: 'What happens if an item goes out of stock?',
      a: 'If an item goes out of stock during manual cart evaluation or before checkout, we will notify you immediately on WhatsApp. You can choose a replacement item or receive an immediate 100% refund to your BML or MIB account.',
    },
    {
      q: 'Are there any prohibited items you cannot order?',
      a: 'In compliance with Maldives Customs Service regulations and airline air-freight safety, we cannot order pork products, alcoholic beverages, items contrary to Islamic tenets, weapons/replicas, or pressurized aerosol flammables.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
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

      {/* FAQ Accordion List */}
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
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 border border-pink-200/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
              Still have questions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Chat directly with our customer support team on WhatsApp anytime.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
