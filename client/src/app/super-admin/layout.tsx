"use client";
import SuperAdminSidebar from "@/components/super-admin/sidebar";
import React, { useState } from "react";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      <SuperAdminSidebar
        isOpen={openSidebar}
        toggle={() => setOpenSidebar(!openSidebar)}
      />
      <div>{children}</div>
    </div>
  );
};

export default SuperAdminLayout;
