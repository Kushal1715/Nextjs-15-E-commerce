"use client";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/productStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetailsContent = ({ productId }: { productId: string }) => {
  const { fetchProductById } = useProductStore();
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetchProductById(productId);
      if (response) {
        setProduct(response);
      } else {
        router.push("/404");
      }
    };
    fetchProductDetails();
  }, [productId, router]);

  console.log(product);
  return (
    <div className="min-h-screen p-4 mt-10 bg-gray-100">
      <div className="flex gap-6">
        <div className="w-2/3 flex gap-4">
          <div className="hidden lg:flex flex-col gap-4">
            {product?.images.map((image: string) => (
              <img src={image} className="w-20 h-20" key={image} />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={product?.images[0]}
              className="w-full h-[750px] object-cover"
            />
          </div>
        </div>
        <div className="w-1/3 flex flex-col space-y-4">
          <h1 className="font-bold text-3xl">{product?.name}</h1>
          <p className="font-bold text-2xl">${product?.price}</p>
          <div>
            <h1 className="mb-2">Color</h1>
            <div className="flex items-center flex-wrap gap-2">
              {product?.colors.map((color: string) => (
                <div
                  className="w-10 h-10 rounded-full cursor-pointer"
                  style={{ background: color }}
                ></div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="mb-2">Size</h1>
            <div className="flex items-center flex-wrap gap-2">
              {product?.sizes.map((size: string) => (
                <Button className="cursor-pointer" key={size}>
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="">
            <h1>Quantity</h1>
            <div className="flex items-center gap-3">
              <Button variant={"outline"}>-</Button>
              <span>1</span>
              <Button variant={"outline"}>+</Button>
            </div>
          </div>
          <Button className="cursor-pointer">ADD TO CART</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContent;
