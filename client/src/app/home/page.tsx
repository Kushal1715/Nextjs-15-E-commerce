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
  return <div>Home</div>;
};

export default Home;
