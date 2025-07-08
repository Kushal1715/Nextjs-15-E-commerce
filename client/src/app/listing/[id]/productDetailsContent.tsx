"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="min-h-screen p-4 mt-10 bg-gray-100">
      <div className=" flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 flex gap-4">
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
        <div className="lg:w-1/3 flex flex-col space-y-4">
          <h1 className="font-bold text-3xl">{product?.name}</h1>
          <p className="font-bold text-2xl">${product?.price}</p>
          <div>
            <h1 className="mb-2">Color</h1>
            <div className="flex items-center flex-wrap gap-2">
              {product?.colors.map((color: string) => (
                <div
                  key={color}
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
      <div className="flex w-full gap-6 mt-4">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="bg-gray-200 w-full">
            <TabsTrigger value="description">PRODUCT DESCRIPTION</TabsTrigger>
            <TabsTrigger value="reviews">REVIEWS</TabsTrigger>
            <TabsTrigger value="shipping">
              SHIPPING AND RETURNS INFO
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card>
              <CardContent className="grid gap-6">
                {product?.description}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardContent className="grid gap-6">product reviews</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping">
            <Card>
              <CardContent className="grid gap-6">
                Shipping and return information goes here.Please read the info
                before proceeding.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailsContent;
