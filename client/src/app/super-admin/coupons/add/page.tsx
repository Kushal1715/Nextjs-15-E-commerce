"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCouponStore } from "@/store/useCouponStore";
import React, { useState } from "react";
import { toast } from "sonner";

const SuperAdminManageCouponsPage = () => {
  const [formState, setFormState] = useState({
    code: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
  });
  const { isLoading } = useCouponStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(formState.startDate) >= new Date(formState.endDate)) {
      toast("Start date must be before end date");
      return;
    }

    const couponData = {
      ...formState,
      discountPercent: formState.discountPercent
        ? parseFloat(formState.discountPercent)
        : 0,
      usageLimit: formState.usageLimit ? parseInt(formState.usageLimit) : 1,
    };
  };
  console.log(formState);
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg md:text-3xl text-gray-800 font-semibold">
              Create New Coupon
            </h1>
          </div>
          <div>
            <button
              className="bg-black px-4 md:px-6 py-2 md:py-3 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              Create Coupon
            </button>
          </div>
        </div>
        <div className="bg-white flex flex-col mt-8 space-y-8">
          <div className="">
            <h1 className="font-semibold text-2xl">Basic Information</h1>
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Coupon Code</Label>
            <Input
              name="code"
              placeholder="Coupon Code"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formState.code}
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Discount Percent</Label>
            <Input
              name="discountPercent"
              placeholder="Discount Percent"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formState.discountPercent}
              type="number"
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Start Date</Label>
            <Input
              name="startDate"
              type="date"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formState.startDate}
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">End Date</Label>
            <Input
              name="endDate"
              type="date"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formState.endDate}
            />
          </div>
          <div className="flex items-start lg:flex-row flex-col">
            <Label className="lg:w-1/5 text-lg">Usage Limit</Label>
            <Input
              name="usageLimit"
              type="number"
              className="lg:w-4/5 border-black rounded-sm"
              onChange={handleInputChange}
              value={formState.usageLimit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminManageCouponsPage;
