import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileText, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms & Conditions — GirlClub Maldives',
  description: 'Pre-order terms, exchange policy, payment methods, delivery conditions, and refund policies for GirlClub Maldives assisted shopping.',
};

export default function TermsPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I have a question regarding terms and policies.')}`;

  return (
    <div className="py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-800 text-xs font-semibold border border-pink-200/60">
          <FileText className="w-3.5 h-3.5 text-pink-600" />
          <span>Customer Agreement & Policies</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Please review the terms and policies governing our assisted shopping, pre-order handling, payment, and delivery across the Maldives.
        </p>
      </div>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">1.</span> Scope of Service & Manual Cart Evaluation
            </h2>
            <p>
              <strong>GirlClub Maldives</strong> operates as an assisted shopping and procurement service. We facilitate orders on behalf of customers in the Maldives for products available on international third-party e-commerce platforms, including <strong>SHEIN</strong>, <strong>TEMU</strong>, <strong>iHerb</strong>, <strong>AliExpress</strong>, <strong>ASOS</strong>, and <strong>YesStyle</strong>.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-medium text-slate-800 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-700 block">
                Manual Order Verification Notice:
              </span>
              <p className="text-xs text-slate-600">
                When product links or carts are submitted, our team manually verifies item availability, stock status, exact sizes/colors, quantities, and real-time prices before official BML/MIB transfer confirmation is issued.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">2.</span> Pricing & Exchange Policy
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-2">
              <li>
                <strong>Conversion Rate:</strong> Product cart totals denominated in US Dollars ($ USD) are converted at the official fixed bank exchange rate of <strong>USD 1 = MVR {SITE_CONFIG.fixedExchangeRate.toFixed(2)}</strong>.
              </li>
              <li>
                <strong>Service Commission:</strong> A service commission fee of <strong>{SITE_CONFIG.commissionPercentage}%</strong> (minimum MVR {SITE_CONFIG.minimumCommissionMvr}) is applied to cover order placement, international freight coordination, and customs handling.
              </li>
              <li>
                <strong>Delivery Fees:</strong> Applicable local delivery charges (Self-Collection: FREE, Malé Doorstep: MVR 35, Hulhumalé: MVR 45, Island Boat Cargo: MVR 75) are itemized transparently prior to payment.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">3.</span> Payment Policy (Bank Transfer Only)
            </h2>
            <p>
              Orders are placed only after full payment is received in MVR. <strong>Payment is strictly via local bank transfer only</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-rose-700 block">Bank of Maldives (BML) — Transfer Only</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-wider">{SITE_CONFIG.bmlAccount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-emerald-700 block">Maldives Islamic Bank (MIB) — Transfer Only</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-wider">{SITE_CONFIG.mibAccount}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Customers must share a valid transaction reference or transfer receipt on WhatsApp (+960 9964143) to confirm the order.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">4.</span> Weekly Batch Schedules & Delivery Timelines
            </h2>
            <p>
              Orders are dispatched according to our official weekly batch schedules:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-xs block">SHEIN Fashion</span>
                <span className="text-[11px] text-pink-700 font-semibold">Tuesdays & Sundays (8:00 PM)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-xs block">TEMU Home & Gadgets</span>
                <span className="text-[11px] text-orange-700 font-semibold">Wednesdays & Sundays (8:00 PM)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-xs block">iHerb Wellness</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Fridays (8:00 PM)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-xs block">AliExpress Tech & Crafts</span>
                <span className="text-[11px] text-rose-700 font-semibold">Tuesdays & Thursdays (8:00 PM)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-xs block">ASOS Outfits & Shoes</span>
                <span className="text-[11px] text-slate-700 font-semibold">Fridays (8:00 PM)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-xs block">YesStyle K-Beauty</span>
                <span className="text-[11px] text-pink-700 font-semibold">Wednesdays (8:00 PM)</span>
              </div>
            </div>
            <p className="pt-2 text-xs text-slate-600">
              Standard estimated transit to Malé is <strong>10 to 18 business days</strong> from batch placement date.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">5.</span> Out of Stock & Refund Policy
            </h2>
            <p>
              If an item becomes unavailable or out of stock before checkout:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
              <li>We notify you immediately on WhatsApp.</li>
              <li>You may select a replacement link, or receive an <strong>immediate 100% refund</strong> in MVR back to your bank account.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">6.</span> Prohibited & Restricted Items
            </h2>
            <p>
              In compliance with Maldives Customs Service regulations and air shipping safety guidelines, we cannot order pork products, alcoholic beverages, items contrary to Islamic principles, weapons/replicas, or pressurized aerosol flammables.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-pink-600">7.</span> Customer Support & Inquiries
            </h2>
            <p>
              For questions, custom requests, or order tracking, reach our support team anytime:
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-full transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Contact on WhatsApp (+960 9964143)</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
