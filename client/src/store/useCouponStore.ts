import { API_ROUTES } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";

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

export const useCouponStore = create<CouponStore>((set, get) => ({
  coupons: [],
  isLoading: false,
  error: null,
  createCoupon: async (coupon) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_ROUTES.COUPONS}/create-coupon`,
        coupon,
        { withCredentials: true }
      );

      set({ isLoading: false });
      return response.data.coupon;
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch coupons" });
      return null;
    }
  },
  fetchAllCoupons: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_ROUTES.COUPONS}/fetch-all-coupons`,
        { withCredentials: true }
      );
      set({ coupons: response.data.couponList, isLoading: false });
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch coupons" });
    }
  },
  deleteCoupon: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_ROUTES.COUPONS}/${id}`, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response.data.success;
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch coupons" });
      return null;
    }
  },
}));
