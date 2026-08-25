import { NextRequest, NextResponse } from 'next/server';
import { ItemStorePlatform } from '@/types';
import { detectStoreFromUrl, extractUrlFromText } from '@/lib/config';

export const runtime = 'edge'; // Ultra-lightweight & free on Vercel Hobby

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawInput = searchParams.get('url') || '';

    if (!rawInput) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    const cleanTarget = extractUrlFromText(rawInput);

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(cleanTarget);
    } catch {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    // Detect initial platform from clean input URL
    let platform: ItemStorePlatform = detectStoreFromUrl(cleanTarget);

    // Setup 4.5s timeout controller to stay well within free serverless limits
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    let html = '';
    let finalUrl = cleanTarget;

    try {
      const response = await fetch(parsedUrl.toString(), {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
          'Accept':
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
      });

      clearTimeout(timeoutId);
      finalUrl = response.url || cleanTarget;
      html = await response.text();
    } catch (err: any) {
      clearTimeout(timeoutId);
    }

    // Refresh platform detection with final redirected URL
    if (platform === 'other') {
      platform = detectStoreFromUrl(finalUrl);
    }

    // Extract Metadata (Title, Image, Price, Store)
    let title = '';
    let imageUrl = '';
    let priceUsd: number | null = null;

    // 1. Try extracting from raw HTML if returned
    if (html) {
      // Title from OpenGraph or meta tags
      const ogTitleMatch =
        html.match(/<meta\s+(?:property|name)=["'](?:og:title|twitter:title|product:name)["']\s+content=["'](.*?)["']/i) ||
        html.match(/<meta\s+content=["'](.*?)["']\s+(?:property|name)=["'](?:og:title|twitter:title|product:name)["']/i);

      if (ogTitleMatch && ogTitleMatch[1]) {
        title = decodeHtmlEntities(ogTitleMatch[1].trim());
      } else {
        const titleTagMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
        if (titleTagMatch && titleTagMatch[1]) {
          title = decodeHtmlEntities(titleTagMatch[1].trim());
        }
      }

      // Filter out Cloudflare bot-checks, interstitials, and generic site tagline titles
      const lower = (title || '').toLowerCase();
      if (
        lower.includes('just a moment') ||
        lower.includes('attention required') ||
        lower.includes('robot') ||
        lower.includes('security check') ||
        lower.includes('access denied') ||
        lower.includes('download page') ||
        lower.includes('download app') ||
        lower.includes('open in app') ||
        lower.includes("women's & men's clothing") ||
        lower.includes('shop online fashion') ||
        lower.includes('online shopping for') ||
        lower.includes('temu | explore') ||
        lower.includes('temu | make your life easier') ||
        lower === 'temu' ||
        lower === 'shein' ||
        lower === 'iherb' ||
        lower === 'aliexpress' ||
        lower === 'asos' ||
        lower === 'yesstyle'
      ) {
        title = '';
      }

      // Clean store prefixes / suffixes
      title = cleanTitle(title);

      // Image from OpenGraph / Twitter / Image tags
      const ogImageMatch =
        html.match(/<meta\s+(?:property|name)=["'](?:og:image|twitter:image|image|product:image)["']\s+content=["'](.*?)["']/i) ||
        html.match(/<meta\s+content=["'](.*?)["']\s+(?:property|name)=["'](?:og:image|twitter:image|image|product:image)["']/i);

      if (ogImageMatch && ogImageMatch[1]) {
        let img = ogImageMatch[1].trim();
        if (img.startsWith('//')) {
          img = 'https:' + img;
        }
        if (img.startsWith('http')) {
          imageUrl = img;
        }
      }

      // Price extraction
      const ogPriceMatch =
        html.match(/<meta\s+(?:property|name)=["'](?:og:price:amount|product:price:amount|price)["']\s+content=["']([\d.]+)["']/i) ||
        html.match(/<meta\s+content=["']([\d.]+)["']\s+(?:property|name)=["'](?:og:price:amount|product:price:amount|price)["']/i);

      if (ogPriceMatch && ogPriceMatch[1]) {
        const parsedPrice = parseFloat(ogPriceMatch[1]);
        if (!isNaN(parsedPrice) && parsedPrice > 0 && parsedPrice < 10000) {
          priceUsd = parsedPrice;
        }
      }

      // JSON-LD Schema extraction
      if (!priceUsd || !title || !imageUrl) {
        try {
          const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
          let match;
          while ((match = jsonLdRegex.exec(html)) !== null) {
            try {
              const data = JSON.parse(match[1]);
              const items = Array.isArray(data) ? data : [data];

              for (const item of items) {
                if (item) {
                  const targetObj = item['@graph'] ? item['@graph'][0] : item;
                  if (!title && targetObj.name && typeof targetObj.name === 'string') {
                    const candidate = cleanTitle(targetObj.name);
                    if (candidate && !candidate.toLowerCase().includes('download')) {
                      title = candidate;
                    }
                  }
                  if (!imageUrl && targetObj.image) {
                    const imgCandidate =
                      typeof targetObj.image === 'string'
                        ? targetObj.image
                        : Array.isArray(targetObj.image)
                        ? targetObj.image[0]
                        : targetObj.image.url || '';
                    if (imgCandidate && typeof imgCandidate === 'string') {
                      imageUrl = imgCandidate.startsWith('//') ? 'https:' + imgCandidate : imgCandidate;
                    }
                  }
                  if (!priceUsd && targetObj.offers) {
                    const offers = Array.isArray(targetObj.offers) ? targetObj.offers[0] : targetObj.offers;
                    if (offers) {
                      const rawPrice = offers.price || offers.lowPrice || offers.highPrice;
                      if (rawPrice) {
                        const p = parseFloat(rawPrice.toString().replace(/[^0-9.]/g, ''));
                        if (!isNaN(p) && p > 0 && p < 10000) priceUsd = p;
                      }
                    }
                  }
                }
              }
            } catch {
              // Ignore malformed JSON
            }
          }
        } catch {
          // Ignore JSON-LD regex errors
        }
      }

      // Store-specific JS state variables
      if (!title || !priceUsd) {
        const goodsNameMatch = html.match(/["'](?:goodsName|goods_name|productTitle|product_name|subject)["']\s*:\s*["']([^"']{4,})["']/i);
        if (!title && goodsNameMatch && goodsNameMatch[1]) {
          const candidate = cleanTitle(decodeHtmlEntities(goodsNameMatch[1]));
          if (candidate && !candidate.toLowerCase().includes('download')) {
            title = candidate;
          }
        }

        const rawPriceMatch =
          html.match(/["'](?:usdAmount|retailPrice|salePrice|sale_price|price|actPrice)["']\s*:\s*["']?\$?([\d.]+)["']?/i) ||
          html.match(/data-price=["']\$?([\d.]+)["']/i);
        if (rawPriceMatch && rawPriceMatch[1]) {
          const p = parseFloat(rawPriceMatch[1]);
          if (!isNaN(p) && p > 0 && p < 10000) priceUsd = p;
        }
      }
    }

    // 2. High-Precision URL & Query Parameter Fallbacks
    if (!title) {
      title =
        extractTitleFromUrl(finalUrl, platform) ||
        extractTitleFromUrl(cleanTarget, platform) ||
        getStoreDefaultTitle(platform);
    }

    const detectedPlatform = platform !== 'other' ? platform : detectStoreFromUrl(finalUrl) || detectStoreFromUrl(cleanTarget);

    // Return structured metadata with 1-hour CDN caching
    return NextResponse.json(
      {
        success: true,
        platform: detectedPlatform,
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        priceUsd: priceUsd ? Math.round(priceUsd * 100) / 100 : undefined,
        url: cleanTarget,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to parse link attributes' },
      { status: 500 }
    );
  }
}

function cleanTitle(str: string): string {
  if (!str) return '';
  return str
    .replace(/\|\s*SHEIN.*$/i, '')
    .replace(/\|\s*TEMU.*$/i, '')
    .replace(/\|\s*iHerb.*$/i, '')
    .replace(/\|\s*AliExpress.*$/i, '')
    .replace(/\|\s*ASOS.*$/i, '')
    .replace(/\|\s*YesStyle.*$/i, '')
    .replace(/-\s*SHEIN.*$/i, '')
    .replace(/-\s*TEMU.*$/i, '')
    .replace(/-\s*iHerb.*$/i, '')
    .replace(/-\s*AliExpress.*$/i, '')
    .replace(/-\s*ASOS.*$/i, '')
    .replace(/-\s*YesStyle.*$/i, '')
    .replace(/^SHEIN\s*[-|:]\s*/i, '')
    .replace(/^TEMU\s*[-|:]\s*/i, '')
    .replace(/^iHerb\s*[-|:]\s*/i, '')
    .replace(/^AliExpress\s*[-|:]\s*/i, '')
    .replace(/^ASOS\s*[-|:]\s*/i, '')
    .replace(/^YesStyle\s*[-|:]\s*/i, '')
    .trim();
}

function getStoreDefaultTitle(store: ItemStorePlatform): string {
  switch (store) {
    case 'shein': return 'SHEIN Fashion Item';
    case 'temu': return 'TEMU Product Item';
    case 'iherb': return 'iHerb Wellness Item';
    case 'aliexpress': return 'AliExpress Item';
    case 'asos': return 'ASOS Fashion Item';
    case 'yesstyle': return 'YesStyle Beauty Item';
    default: return '';
  }
}

/**
 * Robust URL and Query String parser for supported stores
 */
function extractTitleFromUrl(urlStr: string, store: ItemStorePlatform): string {
  try {
    const url = new URL(urlStr);

    // 1. Check Query Parameters (goods_name, search_key, title, name, keyword)
    const qCandidate =
      url.searchParams.get('goods_name') ||
      url.searchParams.get('goods_title') ||
      url.searchParams.get('title') ||
      url.searchParams.get('name') ||
      url.searchParams.get('search_key') ||
      url.searchParams.get('keyword') ||
      url.searchParams.get('q');

    if (qCandidate) {
      const decoded = decodeURIComponent(qCandidate)
        .replace(/[-_+]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
      if (decoded.length > 3 && !decoded.toLowerCase().includes('download')) return decoded;
    }

    // 2. Check Path Slugs
    const pathParts = url.pathname.split('/').filter(Boolean);

    for (let part of pathParts) {
      part = part.replace(/\.html?$/i, '');
      part = part.replace(/-p-\d+.*$/i, ''); // SHEIN ID suffix
      part = part.replace(/-g-\d+.*$/i, ''); // TEMU ID suffix
      part = part.replace(/^goods-/i, '');
      part = part.replace(/^item-/i, '');

      // Skip common non-descriptive path segments
      if (
        part === 'goods' ||
        part === 'product' ||
        part === 'prd' ||
        part === 'item' ||
        part === 'p' ||
        part === 'pr' ||
        part === 'm' ||
        part === 'k' ||
        part === 't' ||
        part === 'en' ||
        part === 'maldives' ||
        part === 'us' ||
        part === 'cart' ||
        part === 'checkout' ||
        part.toLowerCase().includes('download')
      ) {
        continue;
      }

      if (part.includes('-') && part.length > 3) {
        const words = part
          .replace(/[-_+]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .replace(/\s+/g, ' ')
          .trim();
        if (words.length > 3) return words;
      }
    }

    // 3. Fallbacks by Store ID
    if (store === 'aliexpress' || url.hostname.includes('aliexpress')) {
      const aliId = url.pathname.match(/(\d{10,})/)?.[1] || url.pathname.split('/').pop()?.replace(/\.html/i, '');
      if (aliId && aliId.length > 4) {
        return `AliExpress Item #${aliId}`;
      }
    }

    if (store === 'asos' || url.hostname.includes('asos')) {
      const asosId = url.pathname.match(/\/prd\/(\d+)/)?.[1];
      if (asosId) {
        return `ASOS Item #${asosId}`;
      }
    }

    if (store === 'temu' || url.hostname.includes('temu') || url.hostname.includes('temu.to')) {
      const goodsId = url.searchParams.get('goods_id') || url.pathname.match(/(\d{8,})/)?.[1];
      if (goodsId) {
        return `TEMU Product #${goodsId}`;
      }
      if (url.pathname.includes('/m/') || url.pathname.includes('/k/')) {
        const code = url.pathname.split('/').filter(Boolean).pop();
        if (code) return `TEMU App Item (${code})`;
      }
    }

    if (store === 'shein' || url.hostname.includes('shein')) {
      const sheinId = url.pathname.match(/-p-(\d+)/)?.[1] || url.searchParams.get('goods_id');
      if (sheinId) return `SHEIN Item #${sheinId}`;
    }
  } catch {
    // Ignore URL parse error
  }
  return '';
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
