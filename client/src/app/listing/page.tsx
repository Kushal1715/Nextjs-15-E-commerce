import React from "react";

const ProductListingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
          alt="listing page banner image"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-bold text-4xl">HOT COLLECTION</h1>
            <p className="text-lg">Discover our latest collection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
