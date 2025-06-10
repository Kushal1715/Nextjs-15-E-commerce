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
  createProduct: (productData: FormData) => Promise<Product | null>;
  fetchAllProductsForAdmin: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  updateProductByAdmin: (
    id: string,
    productData: FormData
  ) => Promise<Product | null>;
  deleteProductByAdmin: (id: string) => Promise<boolean>;
}
