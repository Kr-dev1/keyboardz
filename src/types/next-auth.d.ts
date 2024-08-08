import { CartItem } from "@/model/userModel";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    cartItems: CartItem[];
    hasOrdered: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      username?: string;
      hasOrdered: boolean;
      cartItems: CartItem[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    hasOrdered: boolean;
    username?: string;
    cartItem: CartItem[];
  }
}
