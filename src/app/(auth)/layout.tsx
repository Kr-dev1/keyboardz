interface AuthLayoutProps {
  children: ReactNode;
}

import Navbar from "@/components/Navbar";
import React, { ReactNode, FC } from "react";

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default AuthLayout;
