"use client";
import SuperAdminSidebar from "@/components/super-admin/sidebar";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      <SuperAdminSidebar
        isOpen={openSidebar}
        toggle={() => setOpenSidebar(!openSidebar)}
      />
      <div className={cn(openSidebar ? "ml-64" : "ml-16")}>{children}</div>
    </div>
  );
};

export default SuperAdminLayout;
