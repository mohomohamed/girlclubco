'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-emerald-400">
            Weekly Batches Active
          </span>
          <span className="hidden md:inline text-slate-400">
            • SHEIN, TEMU, iHerb, AliExpress, ASOS & YesStyle orders closing this week
          </span>
        </div>

        <Link
          href="/stores"
          className="hidden sm:inline-flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 font-medium transition"
        >
          <span>View Batch Schedules</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
