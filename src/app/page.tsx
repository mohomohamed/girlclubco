'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-8">
      {/* 1. Spacious Editorial Hero */}
      <HeroSection />

      {/* 2. Why Shop With Us Trust Grid */}
      <WhyChooseUs />
    </div>
  );
}
