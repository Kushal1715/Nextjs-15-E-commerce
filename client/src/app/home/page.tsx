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
  }, [fetchFeatureBanners, fetchFeaturedProducts]);

  console.log(featureBanners);
  return <div>Home</div>;
};

export default Home;
