import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import QuickCalculator from '@/components/calculator/QuickCalculator';
import { ShoppingBag, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Order Online — GirlClub Maldives (SHEIN • TEMU • iHerb)',
  description: 'Paste your product links from SHEIN, TEMU & iHerb. We handle the ordering, customs clearance, and delivery across Maldives in local MVR.',
};

export default function OrderPage() {
  const exampleAmounts = [25, 50, 75, 100, 150, 200];

  return (
    <div className="py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Assisted Shopping Pre-Order</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Place Your Pre-Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Paste your product links from <strong>SHEIN, TEMU & iHerb</strong> below. Details auto-scan instantly. Pay via BML / MIB (Transfer only).
        </p>
      </div>

      {/* Primary Interactive Order Form */}
      <QuickCalculator />

      {/* MVR Price Guide Cheat Sheet */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
              MVR Price Guide
            </h3>
            <p className="text-xs text-slate-500">
              Sample estimates calculated with fixed 15.42 rate and standard Malé delivery (+MVR 35).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Cart Total ($ USD)</th>
                  <th className="p-3">Base (MVR)</th>
                  <th className="p-3">Service Fee</th>
                  <th className="p-3">Delivery (Malé)</th>
                  <th className="p-3 text-right">Total Payable (MVR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {exampleAmounts.map((usd) => {
                  const base = usd * SITE_CONFIG.fixedExchangeRate;
                  const comm = Math.max(SITE_CONFIG.minimumCommissionMvr, (base * SITE_CONFIG.commissionPercentage) / 100);
                  const delivery = 35;
                  const total = base + comm + delivery;

                  return (
                    <tr key={usd} className="hover:bg-pink-50/30 transition">
                      <td className="p-3 font-bold text-slate-900">${usd}.00 USD</td>
                      <td className="p-3 font-mono">MVR {base.toFixed(2)}</td>
                      <td className="p-3 font-mono text-slate-600">MVR {comm.toFixed(2)}</td>
                      <td className="p-3 text-slate-600">MVR {delivery.toFixed(2)}</td>
                      <td className="p-3 text-right font-serif-luxury font-bold text-pink-700 text-sm">
                        MVR {total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
