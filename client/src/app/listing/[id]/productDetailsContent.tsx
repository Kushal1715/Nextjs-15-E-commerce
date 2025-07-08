"use client";
import { useProductStore } from "@/store/productStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetailsContent = ({ productId }: { productId: string }) => {
  const { fetchProductById } = useProductStore();
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetchProductById(productId);
      console.log(response);
      if (response) {
        setProduct(response);
      } else {
        router.push("/404");
      }
    };
    fetchProductDetails();
  }, [productId, router]);
  return <div>ProductDetailsContent</div>;
};

export default ProductDetailsContent;
