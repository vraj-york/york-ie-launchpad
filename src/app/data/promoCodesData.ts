export type PromoStatus = 'Active' | 'Disabled' | 'Expired';

export type PromoPlan =
  | 'BSPBlueprint (Monthly)'
  | 'BSP Assessment (Individual)'
  | 'BSP Assessment (Annual)';

export interface PromoCodeRow {
  id: string;
  code: string;
  status: PromoStatus;
  discountPct: number;
  plan: PromoPlan;
  usageCurrent: number;
  usageMax: number;
  expiry: string;
}

export const PROMO_CODE_ROWS: PromoCodeRow[] = [
  { id: '1', code: 'BSP100OFF', status: 'Active', discountPct: 100, plan: 'BSPBlueprint (Monthly)', usageCurrent: 99, usageMax: 100, expiry: '12-31-2026' },
  { id: '2', code: 'WELCOME10', status: 'Active', discountPct: 10, plan: 'BSP Assessment (Individual)', usageCurrent: 42, usageMax: 500, expiry: '06-15-2026' },
  { id: '3', code: 'ANNUAL25', status: 'Disabled', discountPct: 25, plan: 'BSP Assessment (Annual)', usageCurrent: 0, usageMax: 50, expiry: '03-01-2026' },
  { id: '4', code: 'LAUNCH50', status: 'Expired', discountPct: 50, plan: 'BSPBlueprint (Monthly)', usageCurrent: 200, usageMax: 200, expiry: '01-10-2025' },
  { id: '5', code: 'TEAM15', status: 'Active', discountPct: 15, plan: 'BSP Assessment (Individual)', usageCurrent: 12, usageMax: 100, expiry: '09-30-2026' },
  { id: '6', code: 'BETA20', status: 'Active', discountPct: 20, plan: 'BSP Assessment (Annual)', usageCurrent: 8, usageMax: 25, expiry: '11-20-2026' },
  { id: '7', code: 'FRIEND5', status: 'Disabled', discountPct: 5, plan: 'BSPBlueprint (Monthly)', usageCurrent: 3, usageMax: 10, expiry: '04-05-2026' },
  { id: '8', code: 'SUMMER30', status: 'Active', discountPct: 30, plan: 'BSP Assessment (Individual)', usageCurrent: 67, usageMax: 150, expiry: '08-01-2026' },
];
