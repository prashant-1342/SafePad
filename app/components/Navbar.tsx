"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Login from "../pages/Login"

export default function Navbar() {
  return (
    <nav className="w-[96%] bg-black left-[2%] rounded-2xl  top-10   fixed z-10 border-2 px-6 py-7 flex items-center justify-between shadow-md">
      <div className="flex gap-8">
      <Link href="/" className="text-2xl font-bold tracking-wide">
        SafePad
      </Link>
      <Link className="text-2xl" href="/features">Features</Link>
      <Link className="text-2xl" href="/contact">Contact</Link>
</div>
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button  className="text-white border-white hover:bg-white hover:text-black">
            Sign Up
          </Button>
        </Link>

        <Link href="/login">
          <Button  className="bg-white text-black hover:bg-gray-300">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}
