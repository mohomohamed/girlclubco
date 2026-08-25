'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import QuickCalculator from '@/components/calculator/QuickCalculator';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SimpleSteps from '@/components/home/SimpleSteps';
import SimpleFAQ from '@/components/home/SimpleFAQ';

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-8">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Order Form & Live Price Calculation */}
      <QuickCalculator />

      {/* 3. Why Shop With Us Trust Grid */}
      <WhyChooseUs />

      {/* 4. 3 Simple Steps */}
      <SimpleSteps />

      {/* 5. Frequently Asked Questions */}
      <SimpleFAQ />
    </div>
  );
}
