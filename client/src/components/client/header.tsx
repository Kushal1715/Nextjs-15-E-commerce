"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ShoppingCart, User2Icon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Products",
    link: "/products",
  },
];

const Header = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };
  return (
    <div className="sticky top-0 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">ECOMMERCE</h1>
        </div>
        <div>
          <ul className="flex space-x-4 font-bold text-lg">
            {menuItems.map((menu, index) => (
              <li key={index}>{menu.title}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ShoppingCart />
            <span className="absolute -top-0.5 -right-0.5 bg-black rounded-full text-white h-4 w-4 p-1 text-xs flex items-center justify-center">
              0
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User2Icon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Your Account</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
