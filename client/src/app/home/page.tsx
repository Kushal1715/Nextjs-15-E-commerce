"use client";
import { useSettingsStore } from "@/store/useSettingStore";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featureBanners.length]);

  console.log(featureBanners);
  console.log(featuredProducts, "featuredProducts");
  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[600px] overflow-hidden">
        {featureBanners.map((banner, index) => (
          <div key={index} className="">
            <div
              className={`absolute ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <img src={banner.imageUrl} alt={`image ${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
