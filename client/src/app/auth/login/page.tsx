"use client";

import React, { useEffect, useState } from "react";
import banner2 from "../../../../public/images/banner2.jpg";
import logo from "../../../../public/images/logo1.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { protectSignInAction } from "@/actions/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const firstLevelOfValidation = await protectSignInAction(formData.email);

    if (!firstLevelOfValidation.success) {
      toast(firstLevelOfValidation.error);
      return;
    }

    const success = await login(formData.email, formData.password);

    if (success) {
      toast("login successfull");
      const user = useAuthStore.getState().user;
      console.log(user);
      if (user?.role === "SUPER_ADMIN") {
        router.push("/super-admin");
      } else {
        router.push("/home");
      }
    } else {
      toast("invalid email or password");
    }
  };

  useEffect(() => {
    const user = useAuthStore.getState().user;
    if (user) {
      if (user.role === "SUPER_ADMIN") {
        router.replace("/super-admin");
      } else {
        router.replace("/home");
      }
    }
  }, []);

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
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                required
                className="bg-[#ffede1]"
                value={formData.email}
                onChange={handleFormChange}
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
                onChange={handleFormChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black transition-colors"
            >
              <>LOGIN</>
            </Button>
            <p className="text-center text-[#3f3d56] text-sm">
              Don't have an account{" "}
              <Link
                href={"/auth/register"}
                className="text-[#000] hover:underline font-bold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
