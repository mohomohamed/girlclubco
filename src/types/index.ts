export type StorePlatform = 'mixed' | 'shein' | 'temu' | 'iherb' | 'aliexpress' | 'asos' | 'yesstyle';

export type ItemStorePlatform = 'shein' | 'temu' | 'iherb' | 'aliexpress' | 'asos' | 'yesstyle' | 'other';

export type DeliveryZone = 'collection' | 'male' | 'hulhumale' | 'island';

export interface StoreInfo {
  id: StorePlatform;
  name: string;
  badge: string;
  rate: number; // MVR per USD (15.42 fixed)
  orderSchedule: string;
  description: string;
  themeColor: string;
}

export interface OrderItemRow {
  id: string;
  platform: ItemStorePlatform;
  url: string;
  title?: string;
  imageUrl?: string;
  sizeColor: string;
  priceUsd: string;
  quantity: number;
  isFetching?: boolean;
}
