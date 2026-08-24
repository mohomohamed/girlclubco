'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Instagram, Heart, Copy, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
  const [copiedBank, setCopiedBank] = useState<'bml' | 'mib' | null>(null);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to inquire about placing an order.')}`;

  const copyBank = (type: 'bml' | 'mib') => {
    const acc = type === 'bml' ? SITE_CONFIG.bmlAccount : SITE_CONFIG.mibAccount;
    navigator.clipboard.writeText(acc);
    setCopiedBank(type);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 lg:pb-16 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold text-white tracking-tight">
                GirlClub
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your trusted assisted shopping service in the Maldives. Shop from SHEIN, TEMU, and iHerb with doorstep delivery and pay locally via BML or MIB.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full transition"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>+960 7614170</span>
              </a>

              <a
                href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-pink-400 transition">Home</Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-pink-400 transition font-semibold text-pink-300">
                  Order Builder
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-pink-400 transition">
                  MVR Calculator
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-pink-400 transition">
                  Stores (SHEIN, TEMU, iHerb)
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
                <Link href="/terms" className="hover:text-pink-400 transition text-slate-300 font-medium">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Stores Supported */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Stores Supported</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/stores#shein" className="hover:text-white transition flex items-center justify-between">
                  <span>SHEIN Fashion</span>
                  <span className="text-[10px] text-pink-400">2x Weekly</span>
                </Link>
              </li>
              <li>
                <Link href="/stores#temu" className="hover:text-white transition flex items-center justify-between">
                  <span>TEMU Home & Gadgets</span>
                  <span className="text-[10px] text-orange-400">2x Weekly</span>
                </Link>
              </li>
              <li>
                <Link href="/stores#iherb" className="hover:text-white transition flex items-center justify-between">
                  <span>iHerb Skincare & Vitamins</span>
                  <span className="text-[10px] text-emerald-400">Weekly</span>
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-white transition flex items-center justify-between">
                  <span>Mixed Stores Order</span>
                  <span className="text-[10px] text-purple-400">Combined</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Local Bank Transfer Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Local Bank Accounts</h4>
            <div className="space-y-2">
              {/* BML */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-rose-400 block">Bank of Maldives (BML)</span>
                  <span className="font-mono text-slate-200 text-xs">{SITE_CONFIG.bmlAccount}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyBank('bml')}
                  className="p-1.5 bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white rounded-lg transition"
                  title="Copy BML Account"
                >
                  {copiedBank === 'bml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* MIB */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 block">Maldives Islamic Bank (MIB)</span>
                  <span className="font-mono text-slate-200 text-xs">{SITE_CONFIG.mibAccount}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyBank('mib')}
                  className="p-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-lg transition"
                  title="Copy MIB Account"
                >
                  {copiedBank === 'mib' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <p>© {new Date().getFullYear()} GirlClub Maldives. All rights reserved.</p>
            <Link href="/terms" className="text-slate-400 hover:text-pink-400 transition underline underline-offset-4">
              Terms & Conditions
            </Link>
          </div>
          <p className="mt-2 sm:mt-0 flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for shoppers in the Maldives
          </p>
        </div>
      </div>
    </footer>
  );
}
