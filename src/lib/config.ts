import { StorePlatform, ItemStorePlatform, StoreInfo, DeliveryZone, OrderItemRow } from '../types';

export const SITE_CONFIG = {
  name: "GirlClub Maldives",
  tagline: "SHEIN • TEMU • iHerb • AliExpress • ASOS • YesStyle Assisted Shopping",
  description: "Shop online from popular international stores with assisted shopping in the Maldives. Pay in MVR via BML or MIB (Transfer only).",
  whatsappNumber: "9609964143",
  viberNumber: "9609964143",
  instagramHandle: "girlclub.mv",
  bmlAccount: "7730000123456 (MVR)",
  mibAccount: "9010000654321 (MVR)",
  
  // Fixed Official Exchange Rate Policy
  fixedExchangeRate: 15.42, // USD 1 = MVR 15.42 (Fixed)
  
  // Service Commission / Profits
  commissionPercentage: 12, // 12% commission
  minimumCommissionMvr: 50, // Minimum MVR 50 service commission for small orders

  deliveryCharges: {
    collection: 0,
    male: 35,
    hulhumale: 45,
    island: 75,
  }
};

export const STORES: Record<StorePlatform, StoreInfo> = {
  mixed: {
    id: 'mixed',
    name: 'All Stores',
    badge: 'Mixed Order',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Consolidated across scheduled batch days',
    description: 'Combine items from SHEIN, TEMU, iHerb, AliExpress, ASOS & YesStyle in one order.',
    themeColor: '#8B5CF6',
  },
  shein: {
    id: 'shein',
    name: 'SHEIN',
    badge: 'Fashion & Outfits',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Orders placed 2x weekly (Tuesdays & Sundays)',
    description: 'Trending dresses, clothing, bags, shoes & accessories.',
    themeColor: '#0F172A',
  },
  temu: {
    id: 'temu',
    name: 'TEMU',
    badge: 'Home & Lifestyle',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Orders placed 2x weekly (Wednesdays & Sundays)',
    description: 'Home organization, gadgets, lifestyle finds & kitchen tools.',
    themeColor: '#EA580C',
  },
  iherb: {
    id: 'iherb',
    name: 'iHerb',
    badge: 'Skincare & Wellness',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Orders placed weekly (Fridays)',
    description: 'Korean skincare, vitamins, beauty, organic wellness & supplements.',
    themeColor: '#16A34A',
  },
  aliexpress: {
    id: 'aliexpress',
    name: 'AliExpress',
    badge: 'Tech & Accessories',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Orders placed 2x weekly (Tuesdays & Thursdays)',
    description: 'Phone cases, watch straps, jewelry, DIY crafting supplies & gadgets.',
    themeColor: '#E11D48',
  },
  asos: {
    id: 'asos',
    name: 'ASOS',
    badge: 'Premium Fashion',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Orders placed weekly (Fridays)',
    description: 'Wedding guest dresses, Eid outfits, modest fashion & branded sneakers.',
    themeColor: '#334155',
  },
  yesstyle: {
    id: 'yesstyle',
    name: 'YesStyle',
    badge: 'K-Beauty & Outfits',
    rate: SITE_CONFIG.fixedExchangeRate,
    orderSchedule: 'Orders placed weekly (Wednesdays)',
    description: 'Viral Korean skincare, COSRX, sunscreens & Asian aesthetic fashion.',
    themeColor: '#EC4899',
  },
};

/**
 * Extracts clean URL from pasted text (handles mobile share blurbs like "Look what I found https://..." or "Check this out https://...")
 */
export function extractUrlFromText(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  const urlMatch = trimmed.match(/(https?:\/\/[^\s]+)/i);
  return urlMatch ? urlMatch[1] : trimmed;
}

export function detectStoreFromUrl(url: string): ItemStorePlatform {
  const clean = (url || '').toLowerCase();
  
  if (
    clean.includes('shein.top') ||
    clean.includes('shein.com') ||
    clean.includes('shein.') ||
    clean.includes('m.shein') ||
    clean.includes('us.shein')
  ) {
    return 'shein';
  }

  if (
    clean.includes('temu.to') ||
    clean.includes('temu.com') ||
    clean.includes('temu.') ||
    clean.includes('share.temu') ||
    clean.includes('app.temu') ||
    clean.includes('m.temu')
  ) {
    return 'temu';
  }

  if (
    clean.includes('iherb.co') ||
    clean.includes('iherb.com') ||
    clean.includes('iherb.') ||
    clean.includes('m.iherb')
  ) {
    return 'iherb';
  }

  if (
    clean.includes('aliexpress.com') ||
    clean.includes('aliexpress.us') ||
    clean.includes('a.aliexpress.com') ||
    clean.includes('s.click.aliexpress.com') ||
    clean.includes('aliexpress.')
  ) {
    return 'aliexpress';
  }

  if (
    clean.includes('asos.com') ||
    clean.includes('asos.top') ||
    clean.includes('asos.')
  ) {
    return 'asos';
  }

  if (
    clean.includes('yesstyle.com') ||
    clean.includes('ys.style') ||
    clean.includes('yesstyle.')
  ) {
    return 'yesstyle';
  }

  return 'other';
}

export function calculateOrderCost(params: {
  cartUsd: number;
  deliveryZone: DeliveryZone;
  customCommissionPercent?: number;
}) {
  const usd = Math.max(0, params.cartUsd || 0);
  const baseMvr = usd * SITE_CONFIG.fixedExchangeRate;
  
  const commPercent = params.customCommissionPercent ?? SITE_CONFIG.commissionPercentage;
  let commissionMvr = (baseMvr * commPercent) / 100;
  
  // Apply minimum commission fee for smaller carts if greater
  if (usd > 0 && commissionMvr < SITE_CONFIG.minimumCommissionMvr) {
    commissionMvr = SITE_CONFIG.minimumCommissionMvr;
  }

  const deliveryMvr = SITE_CONFIG.deliveryCharges[params.deliveryZone] || 0;
  const totalMvr = baseMvr + commissionMvr + deliveryMvr;

  return {
    cartUsd: usd,
    rate: SITE_CONFIG.fixedExchangeRate,
    baseMvr: Math.round(baseMvr * 100) / 100,
    commissionPercent: commPercent,
    commissionMvr: Math.round(commissionMvr * 100) / 100,
    deliveryMvr,
    totalMvr: Math.round(totalMvr * 100) / 100,
  };
}

export function createWhatsAppOrderLink(params: {
  platform: StorePlatform;
  cartUsd?: number;
  deliveryZone?: DeliveryZone;
  customNotes?: string;
  items?: OrderItemRow[];
}): string {
  const storeName = STORES[params.platform]?.name || 'Shopping';
  const phone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  const cost = calculateOrderCost({
    cartUsd: params.cartUsd || 0,
    deliveryZone: params.deliveryZone || 'male',
  });

  const zoneNames: Record<DeliveryZone, string> = {
    collection: 'Self-Collection (FREE)',
    male: 'Malé Doorstep (+MVR 35)',
    hulhumale: 'Hulhumalé (+MVR 45)',
    island: 'Island Boat (+MVR 75)',
  };

  let text = `🌸 *GIRLCLUB ORDER INQUIRY* 🌸\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `🛍️ *Store / Service:* ${storeName}\n`;
  text += `📍 *Delivery Area:* ${zoneNames[params.deliveryZone || 'male']}\n\n`;

  // Include itemized multi-links if present with store badges & titles
  if (params.items && params.items.length > 0) {
    text += `📋 *PRODUCT ITEMS LIST (${params.items.length} items):*\n`;
    params.items.forEach((item, index) => {
      const itemStoreLabel = item.platform ? `[${item.platform.toUpperCase()}]` : '[PRODUCT]';
      const itemTitle = item.title ? ` ${item.title}` : '';
      text += `\n*${index + 1}. ${itemStoreLabel}${itemTitle}*\n${item.url || 'No URL provided'}\n`;
      if (item.sizeColor) {
        text += `   • Size / Color: ${item.sizeColor}\n`;
      }
      if (item.quantity > 1) {
        text += `   • Quantity: ${item.quantity}\n`;
      }
      const itemPrice = parseFloat(item.priceUsd) || 0;
      if (itemPrice > 0) {
        text += `   • Price: $${(itemPrice * item.quantity).toFixed(2)} USD\n`;
      }
    });
    text += `\n`;
  } else if (params.customNotes) {
    text += `🔗 *Cart Link / Notes:*\n${params.customNotes}\n\n`;
  }

  // Pricing calculation
  if (cost.cartUsd > 0) {
    text += `💰 *ESTIMATED CALCULATION:*\n`;
    text += `• Total USD: $${cost.cartUsd.toFixed(2)} USD\n`;
    text += `• Products in MVR: MVR ${cost.baseMvr.toFixed(2)}\n`;
    text += `• Service Fee (${cost.commissionPercent}%): MVR ${cost.commissionMvr.toFixed(2)}\n`;
    if (cost.deliveryMvr > 0) {
      text += `• Delivery: MVR ${cost.deliveryMvr.toFixed(2)}\n`;
    } else {
      text += `• Delivery: Free Collection\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🇲🇻 *ESTIMATED TOTAL:* MVR ${cost.totalMvr.toFixed(2)}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  }

  text += `\n🔍 *Note:* Our team will manually evaluate item availability, stock, and exact price/qty before sending final confirmation & BML/MIB transfer details.\n\n✨ *Thank you!*`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
