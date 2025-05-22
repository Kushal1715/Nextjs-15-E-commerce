import React from "react";
import banner2 from "../../../../public/images/banner2.jpg";
import logo from "../../../../public/images/logo1.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div>
          <Image
            src={banner2}
            alt="banner"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" height={50} width={200} />
          </div>
          <form>
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="bg-[#ffede1]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
