interface FeatureBanner {
  id: string;
  imageUrl: string;
}

interface FeaturedProduct {
  id: string;
  name: string;
  price: string;
  images: string[];
}

interface SettingStore {
  featureBanners: FeatureBanner[];
  featuredProducts: FeaturedProduct[];
  isLoading: boolean;
  error: string | null;
  fetchFeatureBanners: () => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  addFeatureBanner: (files: File[]) => Promise<boolean>;
  updateFeaturedProducts: (productIds: string[]) => Promise<boolean>;
}
