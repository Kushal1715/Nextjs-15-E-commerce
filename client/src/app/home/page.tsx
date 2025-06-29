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
    <div className="min-h-screen">
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
        <div className="absolute bottom-0 left-1/2 flex gap-2">
          {featureBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`cursor-pointer ${
                index === currentSlide
                  ? "bg-white w-4 h-4 rounded-full"
                  : "bg-gray-600 w-2 h-2 rounded-full"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
