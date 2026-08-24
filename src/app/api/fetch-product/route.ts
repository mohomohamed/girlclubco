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

    const platform: ItemStorePlatform = detectStoreFromUrl(cleanTarget);

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
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept':
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Sec-Ch-Ua': '"Chromium";v="123", "Google Chrome";v="123"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"macOS"',
        },
        redirect: 'follow',
      });

      clearTimeout(timeoutId);
      finalUrl = response.url || cleanTarget;
      html = await response.text();
    } catch (err: any) {
      clearTimeout(timeoutId);
    }

    // Extract Metadata (Title, Image, Price, Store)
    let title = '';
    let imageUrl = '';
    let priceUsd: number | null = null;

    if (html) {
      // 1. Title Extraction from OpenGraph & Tags
      const ogTitleMatch =
        html.match(/<meta\s+(?:property|name)=["'](?:og:title|twitter:title)["']\s+content=["'](.*?)["']/i) ||
        html.match(/<meta\s+content=["'](.*?)["']\s+(?:property|name)=["'](?:og:title|twitter:title)["']/i);

      if (ogTitleMatch && ogTitleMatch[1]) {
        title = decodeHtmlEntities(ogTitleMatch[1].trim());
      } else {
        const titleTagMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
        if (titleTagMatch && titleTagMatch[1]) {
          title = decodeHtmlEntities(titleTagMatch[1].trim());
        }
      }

      // Filter out Cloudflare bot-check and generic site tagline titles
      const lower = title.toLowerCase();
      if (
        lower.includes('just a moment') ||
        lower.includes('attention required') ||
        lower.includes('robot') ||
        lower.includes('security check') ||
        lower.includes('access denied') ||
        lower.includes("women's & men's clothing") ||
        lower.includes('shop online fashion') ||
        lower.includes('online shopping for') ||
        lower.includes('temu | explore')
      ) {
        title = '';
      }

      // Clean up store brand suffixes from title
      title = cleanTitle(title);

      // 2. Image Extraction (OpenGraph, Twitter, or Product Meta)
      const ogImageMatch =
        html.match(/<meta\s+(?:property|name)=["'](?:og:image|twitter:image|image)["']\s+content=["'](.*?)["']/i) ||
        html.match(/<meta\s+content=["'](.*?)["']\s+(?:property|name)=["'](?:og:image|twitter:image|image)["']/i);

      if (ogImageMatch && ogImageMatch[1]) {
        let img = ogImageMatch[1].trim();
        if (img.startsWith('//')) {
          img = 'https:' + img;
        }
        if (img.startsWith('http')) {
          imageUrl = img;
        }
      }

      // 3. Price Extraction from OpenGraph & Product Meta
      const ogPriceMatch =
        html.match(/<meta\s+(?:property|name)=["'](?:og:price:amount|product:price:amount|price)["']\s+content=["']([\d.]+)["']/i) ||
        html.match(/<meta\s+content=["']([\d.]+)["']\s+(?:property|name)=["'](?:og:price:amount|product:price:amount|price)["']/i);

      if (ogPriceMatch && ogPriceMatch[1]) {
        const parsedPrice = parseFloat(ogPriceMatch[1]);
        if (!isNaN(parsedPrice) && parsedPrice > 0 && parsedPrice < 10000) {
          priceUsd = parsedPrice;
        }
      }

      // 4. JSON-LD Schema Extraction for Price / Title / Image
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
                  // Check @graph array if present
                  const targetObj = item['@graph'] ? item['@graph'][0] : item;
                  
                  if (!title && targetObj.name && typeof targetObj.name === 'string') {
                    title = cleanTitle(targetObj.name);
                  }
                  if (!imageUrl && targetObj.image) {
                    const imgCandidate = typeof targetObj.image === 'string' 
                      ? targetObj.image 
                      : (Array.isArray(targetObj.image) ? targetObj.image[0] : targetObj.image.url || '');
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
              // Skip malformed JSON
            }
          }
        } catch {
          // Skip JSON-LD errors
        }
      }

      // 5. Raw Script State Price Heuristics (for SHEIN & TEMU JS objects)
      if (!priceUsd) {
        const rawPriceMatch =
          html.match(/["'](?:usdAmount|retailPrice|salePrice|sale_price|price)["']\s*:\s*["']?\$?([\d.]+)["']?/i) ||
          html.match(/data-price=["']\$?([\d.]+)["']/i);
        if (rawPriceMatch && rawPriceMatch[1]) {
          const p = parseFloat(rawPriceMatch[1]);
          if (!isNaN(p) && p > 0 && p < 10000) priceUsd = p;
        }
      }
    }

    // Fallback: If title was not extracted from HTML, parse slug from clean URL
    if (!title) {
      title = extractTitleFromUrlSlug(finalUrl) || extractTitleFromUrlSlug(cleanTarget);
    }

    const detectedPlatform = detectStoreFromUrl(finalUrl) || platform;

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
    .replace(/-\s*SHEIN.*$/i, '')
    .replace(/-\s*TEMU.*$/i, '')
    .replace(/-\s*iHerb.*$/i, '')
    .replace(/^SHEIN\s*[-|:]\s*/i, '')
    .replace(/^TEMU\s*[-|:]\s*/i, '')
    .replace(/^iHerb\s*[-|:]\s*/i, '')
    .trim();
}

function extractTitleFromUrlSlug(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    const pathParts = url.pathname.split('/').filter(Boolean);

    for (let part of pathParts) {
      part = part.replace(/\.html?$/i, '');
      part = part.replace(/-p-\d+.*$/i, '');
      part = part.replace(/-g-\d+.*$/i, '');
      
      // If it contains dashes and is descriptive
      if (part.includes('-') && part.length > 5 && !part.startsWith('pr') && !part.startsWith('risk') && !part.startsWith('cart')) {
        const words = part
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .replace(/\s+/g, ' ')
          .trim();
        if (words.length > 3) return words;
      }
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
