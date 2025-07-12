import { API_BASE_URL, API_ROUTES } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartStore {
  cartItem: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart?: () => Promise<void>;
  addToCart?: (item: Omit<CartItem, "id">) => Promise<void>;
  deleteCart?: (id: string) => Promise<void>;
  updateQuantity?: (id: string, quantity: number) => Promise<void>;
  clearCart?: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => {
  return {
    cartItem: [],
    isLoading: false,
    error: null,
    fetchCart: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.get(`${API_ROUTES.CART}/get`, {
          withCredentials: true,
        });

        set({ isLoading: false, cartItem: response.data.data });
      } catch (e) {
        set({ isLoading: false, error: "failed to load cart items" });
      }
    },
  };
});
