"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEvent } from "react";

export const categories = [
  "Fashion",
  "Electronics",
  "Hand Bag",
  "Shoes",
  "Wallet",
  "Sunglass",
  "Cap",
];
export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
export const colors = [
  { name: "Navy", class: "bg-[#0F172A]" },
  { name: "Yellow", class: "bg-[#FCD34D]" },
  { name: "White", class: "bg-white border" },
  { name: "Orange", class: "bg-[#FB923C]" },
  { name: "Green", class: "bg-[#22C55E]" },
  { name: "Pink", class: "bg-[#EC4899]" },
  { name: "Cyan", class: "bg-[#06B6D4]" },
  { name: "Blue", class: "bg-[#3B82F6]" },
];
export const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];

interface FormState {
  name: string;
  brand: string;
  description: string;
  category: string;
  gender: string;
  price: string;
  stock: string;
}

const SuperAdminManageProductPage = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg md:text-3xl text-gray-800 font-semibold">
              Create New Product
            </h1>
          </div>
          <div>
            <button
              className="bg-black px-4 md:px-6 py-2 md:py-3 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              type="submit"
            >
              Publish Product
            </button>
          </div>
        </div>
        <div className="bg-white flex flex-col mt-8 space-y-6">
          <div className="">
            <h1 className="font-semibold text-2xl">Basic Information</h1>
          </div>
          <div className="flex justify-between">
            <Label className="w-1/5 text-lg">Product Name</Label>
            <Input
              name="name"
              placeholder="Product Name"
              className="w-4/5 border-black rounded-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminManageProductPage;
