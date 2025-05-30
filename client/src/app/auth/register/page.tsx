"use client";

import React, { useState } from "react";
import banner2 from "../../../../public/images/banner2.jpg";
import logo from "../../../../public/images/logo1.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { protectSignUpAction } from "@/actions/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  console.log(formData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const firstLevelOfValidation = await protectSignUpAction(formData.email);

    if (!firstLevelOfValidation.success) {
      toast(firstLevelOfValidation.error);
      return;
    }

    const userId = await register(
      formData.name,
      formData.email,
      formData.password
    );
    if (userId) {
      toast("Registration successfull");
      router.push("/auth/login");
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div>
          <Image
            src={banner2}
            alt="banner"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" height={50} width={200} />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="bg-[#ffede1]"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                required
                className="bg-[#ffede1]"
                value={formData.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                name="password"
                type="text"
                placeholder="Enter your password"
                required
                className="bg-[#ffede1]"
                value={formData.password}
                onChange={handleOnChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : <>Create account</>}
            </Button>
            <p className="text-center text-[#3f3d56] text-sm">
              Already have an account{" "}
              <Link
                href={"/auth/login"}
                className="text-[#000] hover:underline font-bold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
