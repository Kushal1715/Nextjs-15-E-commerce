"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListOrdered,
  LogOut,
  Package,
  Printer,
  SendToBack,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const menuItems = [
  {
    name: "Products",
    icon: Package,
    href: "/super-admin/products/list",
  },
  {
    name: "Add New Product",
    icon: Printer,
    href: "/super-admin/products/add",
  },
  {
    name: "Orders",
    icon: SendToBack,
    href: "/super-admin/orders",
  },
  {
    name: "Coupons",
    icon: FileText,
    href: "/super-admin/coupons/list",
  },
  {
    name: "Create Coupon",
    icon: ListOrdered,
    href: "/super-admin/coupons/add",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/super-admin/settings",
  },
  {
    name: "logout",
    icon: LogOut,
    href: "",
  },
];

const SuperAdminSidebar = ({ isOpen, toggle }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {};
  return (
    <div
      className={cn(
        "min-h-screen bg-background fixed top-0 left-0 transition-all duration-300 border-r-2",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className={cn(!isOpen && "hidden", "font-bold text-xl")}>
          Admin Panel
        </h1>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="ml-auto"
          onClick={toggle}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="mt-4 space-y-1 py-4">
        {menuItems.map((item) => (
          <div
            onClick={
              item.name === "logout"
                ? handleLogout
                : () => router.push(item.href)
            }
            key={item.name}
            className="flex items-center px-6 py-2 cursor-pointer hover:bg-gray-200 transition-colors gap-4"
          >
            <item.icon className="h-4 w-4" />
            {isOpen && item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
