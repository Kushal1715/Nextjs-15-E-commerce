"use client";
import { useProductStore } from "@/store/productStore";
import React, { useEffect } from "react";

const SuperAdminProductListingPage = () => {
  const { products, fetchAllProductsForAdmin } = useProductStore();

  useEffect(() => {
    fetchAllProductsForAdmin();
  }, []);
  console.log(products);
  return <div>SuperAdminProductListingPage</div>;
};

export default SuperAdminProductListingPage;
