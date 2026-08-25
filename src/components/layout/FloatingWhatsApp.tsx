'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GirlClub! I want to send my cart for an MVR quote.')}`;

  return (
    <aside aria-label="WhatsApp Support" className="hidden md:flex fixed bottom-6 right-4 sm:right-6 z-50 items-center gap-2 animate-bounce-subtle">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-xl shadow-emerald-900/30 hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs sm:text-sm">Send Cart on WhatsApp</span>
      </a>
    </aside>
  );
}
