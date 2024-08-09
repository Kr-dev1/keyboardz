"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import { User } from "@/model/userModel";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200  w-full">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <HandMetal className="w-6 h-6 text-zinc-800" aria-label="Home" />
        </Link>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user?.username}</span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
