export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
}

interface CouponStore {
  coupons: Coupon[];
  isLoading: boolean;
  error: string | null;
  createCoupon: (
    coupon: Omit<Coupon, "id" | "usageCount">
  ) => Promise<Coupon | null>;
  fetchAllCoupons: () => Promise<void>;
  deleteCoupon: (id: string) => Promise<boolean>;
}
