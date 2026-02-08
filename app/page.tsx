"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 

const pillars = [
  {
    icon :"/cyber-security.png",
    title: "Encryption-first design",
    body:
      "Every credential is encrypted before it ever reaches storage, keeping secrets readable only by you.",
  },
  {
    icon :"/autofill.png",
    title: "Effortless autofill",
    body:
      "Log in instantly across devices without repeatedly typing or exposing passwords on screen.",
  },
  {
    icon :"/trust.png",
    title: "Built for trust",
    body:
      "No tracking, no data mining, and no hidden access. Your vault stays yours at all times.",
  },
];

export default function Home() {
  const [vaultCount, setVaultCount] = useState<number | string>("...");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setVaultCount(data.vaultCount);
        }
      } catch (error) {
        console.error("Failed to fetch statistics", error);
        setVaultCount("N/A");
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Vault items stored", value: vaultCount },
    { label: "Encryption strength", value: "AES-256" },
    { label: "Zero-knowledge access", value: "100%" },
  ];

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pt-6"> 
      <Navbar />
      <main className="relative overflow-hidden bg-gradient-to-b from-[#0b1224] via-[#070c18] to-[#04070f]">
        <div className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rotate-12 bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500 opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-72 h-80 w-80 -rotate-12 bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-25 blur-3xl" />

        <section className="relative px-6 pb-28 pt-15 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                A safer way to store, protect, and access your passwords.
              </h1>

              <p className="max-w-2xl text-lg text-white/70">
                SafePad is a security-focused password manager that encrypts your
                credentials end-to-end and keeps control entirely in your hands.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/auth/signup">
                  <Button className="h-12 cursor-pointer rounded-xl bg-cyan-400 px-6 text-base font-semibold text-[#04070f] transition hover:-translate-y-0.5 hover:bg-cyan-300">
                    Get started for free
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="h-12 text-white cursor-pointer rounded-xl border-white/20 bg-white/5 px-6 text-base font-semibold text-white transition hover:-translate-y-0.5  hover:border-white/40 hover:text-cyan-400 hover:bg-white/10"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                {stats.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="text-3xl font-semibold">{item.value}</div>
                    <div className="text-sm text-white/60">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              <div className="relative space-y-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">
                  How it works
                </p>
                <h3 className="text-2xl font-semibold">
                  Secure your vault in minutes
                </h3>

                <div className="space-y-4">
                  <Step index="1" title="Create your vault" body="Set a master password that only you know." />
                  <Step index="2" title="Add credentials" body="Store logins manually or generate strong passwords." />
                  <Step index="3" title="Access securely" body="Unlock and autofill whenever you need." />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#060a14] px-6 py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.25em] text-white/50">
                Designed with intent
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Security that stays out of your way
              </h2>
              <p className="text-base text-white/70">
                SafePad focuses on strong defaults and clean design so protection
                feels natural instead of complicated.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="h-10 w-10 flex justify-center items-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500" >
                    <img src={item.icon} alt={item.title} width={24} height={24} />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-28 pt-20 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-[#0c162c] via-[#0e1931] to-[#111c38] p-12 text-center shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Ready to begin
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Take control of your passwords today
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70">
              Build a secure vault, generate stronger passwords, and sign in
              with confidence wherever you go.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup">
                <Button className="h-12 rounded-xl bg-white px-6 text-base font-semibold text-[#0a1226] transition hover:-translate-y-0.5 hover:bg-white/90">
                  Create free account
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/20 bg-white/5 px-6 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  I already use SafePad
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Step({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-400">
        {index}
      </span>
      <div>
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-white/70">{body}</p>
      </div>
    </div>
  );
}