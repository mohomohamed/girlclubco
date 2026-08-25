'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, MessageCircle, ArrowRight, Sparkles, Truck, Check, Copy, ShoppingBag, ShieldCheck } from 'lucide-react';
import { StorePlatform, DeliveryZone } from '@/types';
import { SITE_CONFIG, STORES, calculateOrderCost, createWhatsAppOrderLink } from '@/lib/config';

export default function PricingEstimator() {
  const [platform, setPlatform] = useState<StorePlatform>('mixed');
  const [cartUsd, setCartUsd] = useState<string>('50');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('male');
  const [copied, setCopied] = useState(false);

  const numericUsd = parseFloat(cartUsd) || 0;
  const store = STORES[platform];

  const cost = useMemo(() => {
    return calculateOrderCost({
      cartUsd: numericUsd,
      deliveryZone,
    });
  }, [numericUsd, deliveryZone]);

  const whatsappUrl = useMemo(() => {
    return createWhatsAppOrderLink({
      platform,
      cartUsd: numericUsd > 0 ? numericUsd : undefined,
      deliveryZone,
      customNotes: `General Quote Inquiry for $${numericUsd.toFixed(2)} USD`,
    });
  }, [platform, numericUsd, deliveryZone]);

  const handleCopySummary = () => {
    const text = `🌸 GIRLCLUB MVR QUOTE\n🛍️ Store: ${store.name}\n📍 Delivery: ${deliveryZone}\n💵 Cart: $${cost.cartUsd.toFixed(2)} USD\n🇲🇻 ESTIMATED TOTAL: MVR ${cost.totalMvr.toFixed(2)}\n\n*Pay via BML / MIB (Transfer only).*`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [25, 50, 75, 100, 150, 200, 300];

  return (
    <div className="bg-slate-50/80 rounded-3xl p-5 sm:p-8 border border-pink-100 shadow-soft space-y-6">
      {/* 1. Store Platform */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          1. Select Store Platform
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {(['mixed', 'shein', 'temu', 'iherb'] as StorePlatform[]).map((p) => {
            const isSelected = platform === p;
            const info = STORES[p];
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-pink-600 bg-white shadow-sm ring-2 ring-pink-500/20'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900">{info.name}</span>
                  {isSelected && <span className="text-pink-600 text-xs font-bold">✓</span>}
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block mt-1">
                  {info.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Total USD Input & Quick Presets */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          2. Enter Cart Total ($ USD)
        </label>
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
            $
          </div>
          <input
            type="number"
            min="0"
            step="0.01"
            value={cartUsd}
            onChange={(e) => setCartUsd(e.target.value)}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-3 text-lg font-bold text-slate-900 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Quick Amount Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <span className="text-[11px] font-semibold text-slate-400">Quick Pick:</span>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setCartUsd(preset.toString())}
              className={`text-xs px-2.5 py-1 rounded-lg border transition font-bold ${
                numericUsd === preset
                  ? 'bg-pink-600 text-white border-pink-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Delivery Area */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          3. Delivery Area in Maldives
        </label>
        <select
          value={deliveryZone}
          onChange={(e) => setDeliveryZone(e.target.value as DeliveryZone)}
          className="w-full px-3.5 py-3 text-xs sm:text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="collection">Self-Collection (FREE)</option>
          <option value="male">Malé Doorstep Delivery (+MVR 35)</option>
          <option value="hulhumale">Hulhumalé Delivery (+MVR 45)</option>
          <option value="island">Island Boat / Courier (+MVR 75)</option>
        </select>
      </div>

      {/* 4. Total Card with Itemized Breakdown + Actions */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 text-white rounded-2xl p-5 sm:p-6 space-y-4">
        {/* Transparent Calculation Breakdown */}
        {cost.cartUsd > 0 ? (
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 border-b border-slate-700/80 pb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Cart Total (USD):</span>
              <span className="font-semibold text-white">${cost.cartUsd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Products in MVR:</span>
              <span className="font-mono text-pink-300">
                MVR {cost.baseMvr.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Service Fee ({cost.commissionPercent}%):</span>
              <span className="font-semibold text-white">MVR {cost.commissionMvr.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery:</span>
              <span className="font-semibold text-white">
                {cost.deliveryMvr === 0 ? 'FREE' : `MVR ${cost.deliveryMvr.toFixed(2)}`}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-300 border-b border-slate-700/80 pb-3">
            <p className="text-pink-300 font-semibold">
              ✨ Enter any USD amount above to see instant MVR conversion and delivery breakdown!
            </p>
          </div>
        )}

        {/* Total Payable */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <div>
            <span className="text-[11px] font-semibold text-pink-300 uppercase tracking-wider">
              Estimated Total (MVR)
            </span>
            <div className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
              {cost.totalMvr > 0
                ? `MVR ${cost.totalMvr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : 'Quote on WhatsApp'}
            </div>
          </div>
          <p className="text-xs text-slate-400 max-w-xs text-left sm:text-right">
            * Pay via <strong>BML / MIB (Transfer only)</strong>.
          </p>
        </div>

        {/* Manual Evaluation Note */}
        <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-pink-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready to place your order?</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Paste your individual item links in the Order Builder to auto-scan stock availability and send an itemized order directly to WhatsApp!
          </p>
        </div>

        {/* Action Buttons: Go to Order Builder (Primary) & WhatsApp Quote */}
        <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/order"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg shadow-pink-900/30 hover:scale-[1.02] transition active:scale-95 text-center"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            <span>Build Order with Links</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ask on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3.5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
