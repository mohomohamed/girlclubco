# GirlClub Maldives — Assisted Shopping (WhatsApp Direct)

A clean, high-converting public landing website for **GirlClub Maldives** (SHEIN, TEMU & iHerb assisted shopping service).

Designed with a single focus: **Enable customers to calculate their MVR total and send their cart directly to WhatsApp.**

---

## 🌟 Features
- **Zero Backend / Zero Database**: 100% static, fast, and free to host on Vercel.
- **Published Order Rates**: SHEIN, TEMU, and iHerb rates clearly displayed.
- **Instant MVR Calculator**: Type cart USD total $\rightarrow$ get MVR breakdown $\rightarrow$ 1-click **Send Cart to WhatsApp**.
- **3 Simple Steps Guide**: Explains the shopping, payment in MVR via BML/MIB, and delivery.
- **Floating WhatsApp Button**: Easy 1-tap messaging across mobile & desktop.

---

## 🔧 Edit Business Details & Rates

Edit `src/lib/config.ts`:
```typescript
export const SITE_CONFIG = {
  whatsappNumber: "9607999888", // Your business WhatsApp number
  instagramHandle: "girlclub.mv",
  bmlAccount: "7730000123456 (MVR)",
  mibAccount: "9010000654321 (MVR)",
  rates: {
    shein: 19.50,
    temu: 19.50,
    iherb: 20.00,
  }
};
```

---

## 🚀 Run & Deploy

```bash
# Run locally
npm run dev

# Build static bundle
npm run build

# Deploy to Vercel
npx vercel
```
