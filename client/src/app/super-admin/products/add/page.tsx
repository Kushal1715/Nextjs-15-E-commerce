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
import { url } from "inspector";
import { Plus } from "lucide-react";
import Image from "next/image";
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

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColors = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  console.log(formData);
  console.log(selectedSizes);
  console.log(selectedColors);

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
            <Select
              name="brand"
              onValueChange={(value) => handleSelectChange("brand", value)}
              value={formData.brand}
            >
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
            <Select
              name="category"
              onValueChange={(value) => handleSelectChange("category", value)}
              value={formData.category}
            >
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
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-col items-center justify-center border-2 border-gray-400 h-32 w-32">
                <Plus />
                <Label className="mt-4 cursor-pointer">
                  <span>Add Image</span>
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div
                    className="border-2 border-gray-400 h-32 w-32"
                    key={index}
                  >
                    <Image
                      alt="sd"
                      src={URL.createObjectURL(file)}
                      width={100}
                      height={100}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Gender</Label>
            <Select
              name="gender"
              onValueChange={(value) => handleSelectChange("gender", value)}
              value={formData.gender}
            >
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
                <Button
                  variant={`${
                    selectedSizes.includes(size) ? "default" : "outline"
                  }`}
                  key={size}
                  type="button"
                  onClick={() => handleSize(size)}
                >
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
                  className={`w-8 h-8 rounded-full ${colour.class} ${
                    selectedColors.includes(colour.name)
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  onClick={() => handleColors(colour.name)}
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
