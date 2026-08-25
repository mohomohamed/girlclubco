'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to order from SHEIN / TEMU / iHerb / AliExpress / ASOS / YesStyle.')}`;

  const navLinks = [
    { name: 'Order', href: '/order', highlight: true },
    { name: 'Stores', href: '/stores' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="sticky top-2 sm:top-4 z-40 px-3 sm:px-6 max-w-5xl mx-auto w-full transition-all">
      <div className="bg-white/85 backdrop-blur-xl border border-slate-200/80 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-4 sm:px-6 py-2.5 sm:py-3 transition-all">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                GirlClub
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-semibold">
                MV
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Button-in-Button WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold pl-4 pr-1.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95"
            >
              <span>WhatsApp Us</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 fill-white" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-full transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="text-[9px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 mt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-xs py-3 rounded-2xl shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp (+960 7614170)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
