'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Plus, Trash2, Loader2, CheckCircle2, Copy, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { StorePlatform, ItemStorePlatform, DeliveryZone, OrderItemRow } from '@/types';
import { SITE_CONFIG, STORES, calculateOrderCost, createWhatsAppOrderLink, detectStoreFromUrl, extractUrlFromText } from '@/lib/config';

export default function QuickCalculator() {
  const [platform, setPlatform] = useState<StorePlatform>('mixed');
  const [items, setItems] = useState<OrderItemRow[]>([
    { id: '1', platform: 'shein', url: '', sizeColor: '', priceUsd: '', quantity: 1 },
  ]);
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('male');
  const [copied, setCopied] = useState(false);
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const store = STORES[platform];

  // Calculate total USD across all items
  const totalUsd = useMemo(() => {
    return items.reduce((acc, item) => {
      const p = parseFloat(item.priceUsd) || 0;
      return acc + p * (item.quantity || 1);
    }, 0);
  }, [items]);

  const cost = useMemo(() => {
    return calculateOrderCost({
      cartUsd: totalUsd,
      deliveryZone,
    });
  }, [totalUsd, deliveryZone]);

  const whatsappUrl = useMemo(() => {
    return createWhatsAppOrderLink({
      platform,
      cartUsd: totalUsd > 0 ? totalUsd : undefined,
      deliveryZone,
      items: items.some((i) => i.url.trim()) ? items.filter((i) => i.url.trim()) : undefined,
    });
  }, [platform, totalUsd, deliveryZone, items]);

  // Handlers for adding/removing items
  const handleAddItem = () => {
    const defaultStore: ItemStorePlatform = platform === 'mixed' ? 'shein' : (platform as ItemStorePlatform);
    const newItem: OrderItemRow = {
      id: Date.now().toString(),
      platform: defaultStore,
      url: '',
      sizeColor: '',
      priceUsd: '',
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
    }
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems([{ id: '1', platform: 'shein', url: '', sizeColor: '', priceUsd: '', quantity: 1 }]);
    }
  };

  // Auto-Fetch link attributes (enhanced for all 6 stores)
  const fetchLinkAttributes = async (id: string, rawText: string) => {
    const cleanUrl = extractUrlFromText(rawText);
    if (!cleanUrl || !cleanUrl.startsWith('http')) return;

    const detected = detectStoreFromUrl(cleanUrl);

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFetching: true, platform: detected !== 'other' ? detected : item.platform } : item
      )
    );

    try {
      const res = await fetch(`/api/fetch-product?url=${encodeURIComponent(cleanUrl)}`);
      if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                platform: data.platform || (detected !== 'other' ? detected : item.platform),
                title: data.title || item.title,
                imageUrl: data.imageUrl || item.imageUrl,
                priceUsd: data.priceUsd && !item.priceUsd ? data.priceUsd.toString() : item.priceUsd,
                isFetching: false,
              };
            }
            return item;
          })
        );
      }
    } catch {
      // Fail gracefully
    } finally {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isFetching: false } : item))
      );
    }
  };

  // Debounced auto-fetch on typing or pasting
  const handleUrlChange = (id: string, text: string) => {
    const clean = extractUrlFromText(text);
    const detected = detectStoreFromUrl(clean);

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            url: clean,
            platform: detected !== 'other' ? detected : item.platform,
          };
        }
        return item;
      })
    );

    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
    }

    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      debounceTimers.current[id] = setTimeout(() => {
        fetchLinkAttributes(id, clean);
      }, 350);
    }
  };

  const handleUpdateItem = (id: string, field: keyof OrderItemRow, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleCopySummary = () => {
    let text = `🌸 GIRLCLUB PRE-ORDER\n🛍️ Store: ${store.name}\n📍 Delivery: ${deliveryZone}\n`;
    if (items.length > 0) {
      text += `\n📋 Items List (${items.length}):\n`;
      items.forEach((item, idx) => {
        const titleStr = item.title ? ` - ${item.title}` : '';
        text += `${idx + 1}. [${item.platform.toUpperCase()}]${titleStr}\n   Link: ${item.url || 'N/A'}\n`;
        if (item.sizeColor) text += `   Size/Color: ${item.sizeColor}\n`;
        if (item.quantity > 1) text += `   Qty: ${item.quantity}\n`;
        if (item.priceUsd) text += `   Price: $${item.priceUsd}\n`;
      });
    }

    if (cost.cartUsd > 0) {
      text += `\n💵 Cart Total: $${cost.cartUsd.toFixed(2)} USD\n🇲🇻 ESTIMATED TOTAL: MVR ${cost.totalMvr.toFixed(2)}\n`;
    }

    text += `\n*Note:* Cart will be manually evaluated for stock availability & exact price before confirmation.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const storeOptions: { id: StorePlatform; label: string; badge: string }[] = [
    { id: 'mixed', label: 'All Stores', badge: 'Mixed Order' },
    { id: 'shein', label: 'SHEIN', badge: 'Fashion' },
    { id: 'temu', label: 'TEMU', badge: 'Home & Gadgets' },
    { id: 'iherb', label: 'iHerb', badge: 'Skincare' },
    { id: 'aliexpress', label: 'AliExpress', badge: 'Tech & Crafts' },
    { id: 'asos', label: 'ASOS', badge: 'Outfits & Shoes' },
    { id: 'yesstyle', label: 'YesStyle', badge: 'K-Beauty' },
  ];

  const getStoreBadgeColor = (p: ItemStorePlatform) => {
    switch (p) {
      case 'shein': return 'bg-slate-900 text-white';
      case 'temu': return 'bg-orange-600 text-white';
      case 'iherb': return 'bg-emerald-700 text-white';
      case 'aliexpress': return 'bg-rose-600 text-white';
      case 'asos': return 'bg-slate-700 text-white';
      case 'yesstyle': return 'bg-pink-600 text-white';
      default: return 'bg-purple-700 text-white';
    }
  };

  return (
    <section id="order-form" className="py-6 sm:py-10 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-slate-50/80 rounded-3xl p-5 sm:p-8 border border-pink-100 shadow-soft space-y-6">
          
          {/* 1. Store Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Select Store
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {storeOptions.map((opt) => {
                const isSelected = platform === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPlatform(opt.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-pink-600 bg-white shadow-sm ring-2 ring-pink-500/20'
                        : 'border-slate-200 bg-white/60 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">{opt.label}</span>
                      {isSelected && <span className="text-pink-600 text-xs font-bold">✓</span>}
                    </div>
                    <span className="text-[9px] font-semibold text-slate-500 block mt-0.5 truncate">
                      {opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Product Links Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Product Links ({items.length} item{items.length > 1 ? 's' : ''})
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-3.5">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 relative group"
                >
                  {/* Header Row: Item Number, Store Badges, Remove */}
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100/80">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-x-auto no-scrollbar py-0.5">
                      <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md flex-shrink-0">
                        Item #{index + 1}
                      </span>

                      {/* Store Switcher (Horizontal Scroll on Mobile) */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {(['shein', 'temu', 'iherb', 'aliexpress', 'asos', 'yesstyle'] as ItemStorePlatform[]).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleUpdateItem(item.id, 'platform', st)}
                            className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase transition flex-shrink-0 ${
                              item.platform === st
                                ? getStoreBadgeColor(st)
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition ml-auto"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Product URL Input with Auto-Scan */}
                  <div className="relative">
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => handleUrlChange(item.id, e.target.value)}
                      placeholder="Paste link from SHEIN, TEMU, iHerb, AliExpress, ASOS, or YesStyle..."
                      className="w-full pl-3.5 pr-28 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
                    />

                    {/* Scan Indicator */}
                    <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
                      {item.isFetching ? (
                        <div className="px-2.5 py-1 text-[11px] font-bold bg-pink-100 text-pink-800 rounded-lg flex items-center gap-1 animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin text-pink-600" />
                          <span>Scanning...</span>
                        </div>
                      ) : item.title || item.imageUrl ? (
                        <button
                          type="button"
                          onClick={() => fetchLinkAttributes(item.id, item.url)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg flex items-center gap-1 transition"
                          title="Refresh scan"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Scanned</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fetchLinkAttributes(item.id, item.url)}
                          disabled={!item.url.trim()}
                          className="px-2.5 py-1 text-[11px] font-bold bg-pink-100 hover:bg-pink-200 text-pink-800 disabled:opacity-40 rounded-lg transition flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-pink-600" />
                          <span>Scan</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Auto-Scanned Product Preview Card */}
                  {(item.title || item.imageUrl) && (
                    <div className="p-3 bg-gradient-to-r from-pink-50/80 to-purple-50/50 border border-pink-100/90 rounded-2xl flex items-center gap-3 animate-in fade-in duration-200">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title || 'Product thumbnail'}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-pink-200 flex-shrink-0 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            item.platform === 'temu'
                              ? 'bg-orange-100 text-orange-600'
                              : item.platform === 'iherb'
                              ? 'bg-emerald-100 text-emerald-600'
                              : item.platform === 'aliexpress'
                              ? 'bg-rose-100 text-rose-600'
                              : item.platform === 'asos'
                              ? 'bg-slate-200 text-slate-800'
                              : item.platform === 'yesstyle'
                              ? 'bg-pink-100 text-pink-600'
                              : 'bg-pink-100 text-pink-600'
                          }`}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-md ${
                              item.platform === 'temu'
                                ? 'bg-orange-200 text-orange-950'
                                : item.platform === 'iherb'
                                ? 'bg-emerald-200 text-emerald-950'
                                : item.platform === 'aliexpress'
                                ? 'bg-rose-200 text-rose-950'
                                : item.platform === 'asos'
                                ? 'bg-slate-300 text-slate-950'
                                : item.platform === 'yesstyle'
                                ? 'bg-pink-200 text-pink-950'
                                : 'bg-pink-200/80 text-pink-900'
                            }`}
                          >
                            {item.platform.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Scanned
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.title || 'Product details detected'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Variations: Size/Color, Price, Qty */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        value={item.sizeColor}
                        onChange={(e) => handleUpdateItem(item.id, 'sizeColor', e.target.value)}
                        placeholder="Size / Color (e.g. M, Pink)"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-xs font-bold text-slate-400">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.priceUsd}
                          onChange={(e) => handleUpdateItem(item.id, 'priceUsd', e.target.value)}
                          placeholder="$ USD"
                          className="w-full pl-6 pr-2 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-pink-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-medium">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full p-2 text-xs font-bold text-center bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Add Item Button */}
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-2.5 border-2 border-dashed border-pink-300 hover:border-pink-500 bg-pink-50/50 hover:bg-pink-50 text-pink-700 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>

          {/* 3. Delivery Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              3. Delivery Area
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

          {/* 4. Total Card: Dual USD / MVR Total Display + WhatsApp Dispatch */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 text-white rounded-2xl p-5 sm:p-6 space-y-4">
            
            {/* Calculation Breakdown */}
            {cost.cartUsd > 0 ? (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 border-b border-slate-700/80 pb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cart Total (USD):</span>
                  <span className="font-bold text-white tabular-nums">${cost.cartUsd.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Products in MVR:</span>
                  <span className="font-semibold text-pink-300 tabular-nums">MVR {cost.baseMvr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Fee ({cost.commissionPercent}%):</span>
                  <span className="font-semibold text-white tabular-nums">MVR {cost.commissionMvr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery:</span>
                  <span className="font-semibold text-white tabular-nums">
                    {cost.deliveryMvr === 0 ? 'FREE' : `MVR ${cost.deliveryMvr.toFixed(2)}`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-300 border-b border-slate-700/80 pb-3">
                <p className="text-pink-300 font-semibold">
                  Paste your product links above to calculate your total in USD & MVR!
                </p>
              </div>
            )}

            {/* DUAL TOTAL DISPLAY: USD Cart + MVR Total */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-pink-300 uppercase tracking-wider">
                    Estimated Total
                  </span>
                  {cost.cartUsd > 0 && (
                    <span className="text-xs font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-md tabular-nums">
                      Cart: ${cost.cartUsd.toFixed(2)} USD
                    </span>
                  )}
                </div>
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
                <span>Manual Verification:</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Our team manually verifies stock availability and exact price before sending your BML/MIB transfer confirmation.
              </p>
            </div>

            {/* Action Buttons: WhatsApp (Primary) & Copy */}
            <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-900/30 hover:scale-[1.02] transition active:scale-95 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Send Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
