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
import { SlidersHorizontal } from "lucide-react";
import React from "react";

const ProductListingPage = () => {
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
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter</DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* to filter using desktop  */}
            <div className="hidden lg:flex">
              <Select>
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
      </div>
    </div>
  );
};

export default ProductListingPage;
