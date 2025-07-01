"use client";
import React, { ReactNode } from "react";
import Header from "../client/header";
import { usePathname } from "next/navigation";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  const showHeader =
    pathName.startsWith("/auth") || pathName.startsWith("/super-admin");

  return (
    <div>
      {!showHeader && (
        <div>
          <Header />
        </div>
      )}
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
