"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { brands, categories, colors, sizes } from "@/utils/config";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProductStore } from "@/store/productStore";

const ProductListingPage = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const {
    products,
    totalProducts,
    currentPage,
    totalPages,
    fetchProductsForClient,
    updateCurrentPage,
  } = useProductStore();

  console.log(totalPages, "total pages");

  useEffect(() => {
    fetchProductsForClient({
      page: currentPage,
      limit: 3,
      categories: selectedCategories,
      brands: selectedBrands,
      sizes: selectedSizes,
      colors: selectedColors,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy: sortBy,
      sortOrder: sortOrder,
    });
  }, [
    currentPage,
    sortBy,
    sortOrder,
    selectedCategories,
    selectedBrands,
    selectedSizes,
    selectedColors,
    priceRange,
  ]);

  console.log(products);

  const handleSortChange = (value: string) => {
    const sortValues = value.split("-");
    setSortBy(sortValues[0]);
    setSortOrder(sortValues[1] as "asc" | "desc");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((s) => s !== color) : [...prev, color]
    );
  };

  const FilterSection = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-lg">Categories</h1>
          <div className="space-y-3 mt-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={category}
                  className="border-black"
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label>{category}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">Brand</h1>
          <div className="space-y-3 mt-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <Checkbox
                  id={brand}
                  className="border-black"
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <Label>{brand}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">Size</h1>
          <div className="flex items-center flex-wrap gap-2 mt-3">
            {sizes.map((size) => (
              <Button
                key={size}
                className={`cursor-pointer border-black`}
                onClick={() => handleSizeChange(size)}
                variant={selectedSizes.includes(size) ? "default" : "outline"}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">Colors</h1>
          <div className="flex items-center flex-wrap gap-2 mt-3">
            {colors.map((color) => (
              <div
                key={color.class}
                className={`w-6 h-6 rounded-full ${
                  color.class
                } cursor-pointer ${
                  selectedColors.includes(color.name)
                    ? "ring-offset-2 ring-1"
                    : ""
                }`}
                onClick={() => handleColorChange(color.name)}
              ></div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">Price Range</h1>
          <div className=" mt-3">
            <Slider
              defaultValue={[0, 100000]}
              className="w-full"
              max={100000}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
            />
          </div>
          <div className="flex items-center justify-between font-bold mt-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    );
  };
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
      <div className="mt-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl">All Products</h1>
          </div>
          <div>
            {/* to filter using mobile */}
            <div className="lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-sm"
                  >
                    <SlidersHorizontal />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-auto">
                  <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">
                      Filter
                    </DialogTitle>
                  </DialogHeader>
                  <FilterSection />
                </DialogContent>
              </Dialog>
            </div>

            {/* to filter using desktop  */}
            <div className="hidden lg:flex">
              <Select
                value={sortBy + "-" + sortOrder}
                onValueChange={(value) => handleSortChange(value)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="createdAt-asc">
                      Sort by: Featured
                    </SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price : High to Low
                    </SelectItem>
                    <SelectItem value="createdAt-desc">
                      Sort by: Newest First
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-8">
          <div className="w-64 hidden lg:flex flex-col">
            <FilterSection />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative aspect-[3/4] mb-4 bg-gray-100 overflow-hidden">
                  <img
                    src={product.images[0]}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute flex items-center justify-center bg-gray-300 inset-0 opacity-0 hover:opacity-100">
                    <Button className="hover:bg-white hover:text-black">
                      Quick View
                    </Button>
                  </div>
                </div>
                <div className="font-bold text-lg">
                  <h1>{product.name}</h1>
                  <div className="flex items-center justify-between ">
                    <span>${product.price}</span>
                    <div className="flex items-center gap-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full cursor-pointer`}
                          style={{ background: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
