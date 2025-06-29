"use client";
import { useSettingsStore } from "@/store/useSettingStore";
import React, { useEffect } from "react";

const Home = () => {
  const {
    featureBanners,
    featuredProducts,
    fetchFeatureBanners,
    fetchFeaturedProducts,
  } = useSettingsStore();

  useEffect(() => {
    fetchFeatureBanners();
    fetchFeaturedProducts();
  }, [fetchFeatureBanners, fetchFeaturedProducts]);

  console.log(featureBanners);
  console.log(featuredProducts, "featuredProducts");
  return (
    <div className="min-h-screen">
      <div>
        {featureBanners.map((banner, index) => (
          <div key={index} className="relative w-full h-96">
            <div className="absolute">
              <img src={banner.imageUrl} alt={`image ${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
