"use client";

import Link from "next/link";

const links = [
  { label: "Features", href: "/auth/features" },
  { label: "Security", href: "/auth/security" },
  { label: "Contact", href: "/auth/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050812] px-6 py-12 text-white lg:px-16 xl:px-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="text-xl font-semibold">SafePad</div>
          <p className="max-w-md text-sm text-white/60 leading-relaxed">
            SafePad is a security-focused password manager built to demonstrate
            modern encryption practices, privacy-first design, and clean user
            experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-medium text-white/70">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
        © {new Date().getFullYear()} SafePad. Built with a focus on security and control.
      </div>
    </footer>
  );
}
