"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[94%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 backdrop-blur shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-semibold tracking-wide">
            SafePad
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/auth/features"
              className="text-sm font-medium text-white/80 transition hover:text-cyan-400"
            >
              Features
            </Link>
            <Link
              href="/auth/security"
              className="text-sm font-medium text-white/80 transition hover:text-cyan-400"
            >
              Security
            </Link>
            <Link
              href="/auth/contact"
              className="text-sm font-medium text-white/80 transition hover:text-cyan-400"
            >
              Contact
            </Link>
            <Link
              href="/auth/extension"
              className="text-sm font-medium text-white/80 transition hover:text-cyan-400"
            >
              Browser Extension
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/signup">
            <Button
              variant="outline"
              className="h-9 rounded-lg border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Sign up
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button className="h-9 rounded-lg bg-cyan-400 px-4 text-sm font-semibold text-black transition hover:bg-cyan-300">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
