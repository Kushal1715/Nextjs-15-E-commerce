import React from "react";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <div>ProductDetailsPage</div>;
};

export default ProductDetailsPage;
