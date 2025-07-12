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
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>;
  deleteCart: (id: string) => Promise<void>;
  updateQuantity?: (id: string, quantity: number) => Promise<void>;
  clearCart?: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => {
  return {
    cartItems: [],
    isLoading: false,
    error: null,
    fetchCart: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.get(`${API_ROUTES.CART}/get`, {
          withCredentials: true,
        });

        set({ isLoading: false, cartItems: response.data.data });
      } catch (e) {
        set({ isLoading: false, error: "failed to load cart items" });
      }
    },
    addToCart: async (item) => {
      set({ isLoading: true, error: null });
      try {
        const reponse = await axios.post(`${API_ROUTES.CART}/add`, item, {
          withCredentials: true,
        });

        set((state) => ({
          cartItems: [...state.cartItems, reponse.data.data],
          isLoading: false,
        }));
      } catch (e) {
        set({ isLoading: false, error: "failed to add to cart" });
      }
    },
    deleteCart: async (id) => {
      set({ isLoading: true, error: null });
      try {
        const reponse = await axios.delete(`${API_ROUTES.CART}/delete${id}`, {
          withCredentials: true,
        });

        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
          isLoading: false,
        }));
      } catch (e) {
        set({ isLoading: false, error: "failed to delete cart item" });
      }
    },
  };
});
