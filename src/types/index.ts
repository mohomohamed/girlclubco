export type StorePlatform = 'shein' | 'temu' | 'iherb' | 'mixed';

export type ItemStorePlatform = 'shein' | 'temu' | 'iherb' | 'other';

export type DeliveryZone = 'collection' | 'male' | 'hulhumale' | 'island';

export interface StoreInfo {
  id: StorePlatform;
  name: string;
  badge: string;
  rate: number; // MVR per USD
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
