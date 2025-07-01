import React, { ReactNode } from "react";
import Header from "../client/header";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
