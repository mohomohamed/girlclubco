'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Instagram, Heart, Copy, Check, ShieldCheck, Clock, ArrowUpRight, Sparkles, MapPin } from 'lucide-react';
import { SITE_CONFIG, STORES } from '@/lib/config';

export default function Footer() {
  const [copiedBank, setCopiedBank] = useState<'bml' | 'mib' | null>(null);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to inquire about placing an order.')}`;

  const copyBank = (type: 'bml' | 'mib') => {
    const acc = type === 'bml' ? SITE_CONFIG.bmlAccount : SITE_CONFIG.mibAccount;
    navigator.clipboard.writeText(acc);
    setCopiedBank(type);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-28 lg:pb-16 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-900/40 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold text-white tracking-tight">
                  GirlClub
                </span>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-pink-400 -mt-1">
                  Maldives • Assisted Shopping
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted proxy shopping service in the Maldives. Shop from SHEIN, TEMU, and iHerb with doorstep delivery in Malé and cargo boat drops to all atolls.
            </p>

            <div className="pt-1 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                <span>Orders Processed 7 Days a Week</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Malé, Hulhumalé & Island Boat Handover</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>+960 7614170</span>
              </a>

              <a
                href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-pink-600 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-pink-400 transition flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-pink-300 hover:text-white font-semibold transition flex items-center gap-1">
                  <span>Order</span>
                  <span className="text-[9px] bg-pink-900/60 text-pink-300 px-1.5 py-0.5 rounded font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/order#order-form" className="hover:text-pink-400 transition">
                  MVR Price Guide
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-pink-400 transition">
                  Stores Guide
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-pink-400 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-pink-400 transition">
                  FAQ & Policies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-pink-400 transition font-medium">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Stores Supported (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Stores & Batch Days
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/stores#shein" className="flex items-center justify-between text-slate-300 hover:text-white transition py-1">
                  <span>SHEIN Fashion</span>
                  <span className="text-[10px] font-bold text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-full">
                    Tue & Sun
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stores#temu" className="flex items-center justify-between text-slate-300 hover:text-white transition py-1">
                  <span>TEMU Home & Gadgets</span>
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded-full">
                    Wed & Sun
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stores#iherb" className="flex items-center justify-between text-slate-300 hover:text-white transition py-1">
                  <span>iHerb Skincare & Vitamins</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Fridays
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stores#aliexpress" className="flex items-center justify-between text-slate-300 hover:text-white transition py-1">
                  <span>AliExpress Tech & Crafts</span>
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full">
                    Tue & Thu
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stores#asos" className="flex items-center justify-between text-slate-300 hover:text-white transition py-1">
                  <span>ASOS Premium Outfits</span>
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
                    Fridays
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stores#yesstyle" className="flex items-center justify-between text-slate-300 hover:text-white transition py-1">
                  <span>YesStyle K-Beauty</span>
                  <span className="text-[10px] font-bold text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-full">
                    Wednesdays
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Bank Transfer Accounts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Bank Transfer Accounts
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Payment strictly via local transfer only
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {/* BML Account Card */}
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-pink-900/50 transition">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-rose-400">
                    Bank of Maldives (BML)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">MVR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white text-xs sm:text-sm font-bold tracking-wider">
                    {SITE_CONFIG.bmlAccount}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyBank('bml')}
                    className="p-1.5 bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white rounded-lg transition"
                    title="Copy BML Account Number"
                  >
                    {copiedBank === 'bml' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* MIB Account Card */}
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-900/50 transition">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                    Maldives Islamic Bank (MIB)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">MVR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white text-xs sm:text-sm font-bold tracking-wider">
                    {SITE_CONFIG.mibAccount}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyBank('mib')}
                    className="p-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-lg transition"
                    title="Copy MIB Account Number"
                  >
                    {copiedBank === 'mib' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {copiedBank && (
              <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3 h-3" /> Account number copied to clipboard!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4">
            <p>© {new Date().getFullYear()} GirlClub Maldives. All rights reserved.</p>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-pink-400 transition underline underline-offset-4"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/faq"
              className="text-slate-400 hover:text-pink-400 transition"
            >
              Pre-Order Policies
            </Link>
          </div>

          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>for shoppers in the Maldives 🇲🇻</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
