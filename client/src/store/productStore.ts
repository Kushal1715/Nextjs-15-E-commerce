import { API_ROUTES } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  gender: string;
  sizes: string[];
  colors: string[];
  price: number;
  stock: number;
  rating?: number;
  soldCount: number;
  images: string[];
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  createProduct: (productData: FormData) => Promise<Product | null>;
  fetchAllProductsForAdmin: () => Promise<void>;
  fetchProductsForClient: (params: {
    page?: number;
    limit?: number;
    categories?: string[];
    brands?: string[];
    sizes?: string[];
    colors?: string[];
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  updateProductByAdmin: (
    id: string,
    productData: FormData
  ) => Promise<Product | null>;
  deleteProductByAdmin: (id: string) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  createProduct: async (productData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_ROUTES.PRODUCTS}/create-new-product`,
        productData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: "Failed to create product" });
      return null;
    }
  },
  fetchAllProductsForAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_ROUTES.PRODUCTS}/fetch-admin-products`,
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false, products: response.data.products || [] });
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch products" });
    }
  },
  fetchProductsForClient: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const queryParams = {
        ...params,
        categories: params.categories?.join(","),
        brands: params.brands?.join(","),
        sizes: params.sizes?.join(","),
        colors: params.colors?.join(","),
      };

      const response = await axios.get(
        `${API_ROUTES.PRODUCTS}/fetch-client-products`,
        {
          params: queryParams,
          withCredentials: true,
        }
      );
      console.log(response.data);

      set({
        isLoading: false,
        products: response.data.products,
        totalProducts: response.data.totalProducts,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      set({ isLoading: false, error: "failed to fetch products" });
    }
  },
  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.PRODUCTS}/${id}`, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch product" });
      return null;
    }
  },
  updateProductByAdmin: async (id: string, productData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(
        `${API_ROUTES.PRODUCTS}/${id}`,
        productData,
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false });
      return response.data.updateProduct;
    } catch (error) {
      set({ isLoading: false, error: "Failed to update product" });
      return null;
    }
  },
  deleteProductByAdmin: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_ROUTES.PRODUCTS}/${id}`, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false, error: "Failed to delete product" });
      return false;
    }
  },
}));
