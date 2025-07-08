import React, { Suspense } from "react";
import ProductDetailsContent from "./productDetailsContent";
import ProductDetailsSkeleton from "./productDetailsSkeleton";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent productId={params.id} />
    </Suspense>
  );
};

export default ProductDetailsPage;
