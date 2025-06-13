"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    category: "",
    gender: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  console.log(formData);

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
        <div className="bg-white flex flex-col mt-8 space-y-8">
          <div className="">
            <h1 className="font-semibold text-2xl">Basic Information</h1>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Product Name</Label>
            <Input
              name="name"
              placeholder="Product Name"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Product Description</Label>
            <Textarea
              name="description"
              placeholder="Product Description"
              className="lg:w-4/5 border-black rounded-sm min-h-[150px]"
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Product Brand</Label>
            <Select name="brand">
              <SelectTrigger className="lg:w-4/5 w-full border-black rounded-sm">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand.toLowerCase()}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Product Category</Label>
            <Select name="category">
              <SelectTrigger className="lg:w-4/5 w-full border-black rounded-sm">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category.toLocaleLowerCase()}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Product Image</Label>
            <div className="flex flex-col items-center justify-center border-2 border-gray-400 h-32 w-32">
              <Plus />
              <Label className="mt-4 cursor-pointer">
                <span>Add Image</span>
                <input type="file" multiple className="sr-only" />
              </Label>
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Gender</Label>
            <Select name="gender">
              <SelectTrigger className="lg:w-4/5 w-full border-black rounded-sm">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Size</Label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button variant="default" key={size} type="button">
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Colour</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((colour) => (
                <Button
                  key={colour.class}
                  type="button"
                  className={`w-8 h-8 rounded-full ${colour.class}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Product Price</Label>
            <Input
              name="price"
              placeholder="Product Price"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formData.price}
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Stock</Label>
            <Input
              name="stock"
              placeholder="Stock"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formData.stock}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminManageProductPage;
