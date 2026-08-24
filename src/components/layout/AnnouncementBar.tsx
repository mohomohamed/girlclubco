'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white text-[11px] sm:text-xs py-1.5 px-4 shadow-sm relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-center text-center gap-2">
        <span className="bg-white/20 text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-yellow-300" /> Assisted Pre-Orders
        </span>
        <span className="text-pink-50 font-medium">
          Shop SHEIN, TEMU & iHerb in Maldives • Doorstep & Island Boat Delivery • Pay via BML / MIB (Transfer Only)
        </span>
      </div>
    </div>
  );
}
