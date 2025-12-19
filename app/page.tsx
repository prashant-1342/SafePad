import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const stats = [
  { label: "Passwords secured", value: "N/a" },
  { label: "Autofill success", value: "N/A" },
  { label: "Devices synced", value: "N/A" },
];

const pillars = [
  {
    title: "Private by default",
    body:
      "Only you can see your data. End-to-end encryption keeps every login sealed—even we can't read it.",
  },
  {
    title: "One-tap autofill",
    body:
      "Save once, sign in everywhere. Autofill on desktop and mobile with passkeys, Face ID, or Touch ID.",
  },
  {
    title: "Breach alerts",
    body:
      "Get notified fast if a site you use is hacked. Swap passwords with the built-in generator in seconds.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#04070f] text-white">
      <Navbar />

      <main className="relative isolate overflow-hidden bg-linear-to-b from-[#0a1226] via-[#080d1a] to-[#04070f]">
        <div className="pointer-events-none absolute -left-10 top-0 h-80 w-80 rotate-12 bg-linear-to-br from-[#5ee7df] via-[#4da1ff] to-[#915eff] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-60 h-72 w-72 -rotate-12 bg-linear-to-br from-[#ffb36c] via-[#ff5f6d] to-[#f89cff] opacity-30 blur-3xl" />

        <section className="relative px-6 pb-24 pt-36 lg:px-16 xl:px-24">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              

              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Keep every password safe and ready to autofill across all your devices.
              </h1>

              <p className="max-w-2xl text-lg text-white/70">
                Save logins once and never type them again. SafePad encrypts your vault end-to-end, syncs instantly, and lets you sign in with masterpassword.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/register">
                  <Button className="h-12 rounded-xl bg-[#5ee7df] px-6 text-base font-semibold text-[#04070f] transition hover:-translate-y-0.5 hover:bg-[#53d6cf]">
                    Create free account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="h-12 rounded-xl border-white/20 bg-white/5 px-6 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
                    Already have an account?
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
                {stats.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="text-3xl font-semibold">{item.value}</div>
                    <div className="text-sm text-white/60">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-transparent to-white/5" />
              <div className="relative space-y-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Getting started</p>
                <h3 className="text-2xl font-semibold">Set up your vault in three steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#5ee7df]/20 text-sm font-semibold text-[#5ee7df]">1</span>
                    <div>
                      <div className="font-semibold">Add your logins</div>
                      <p className="text-sm text-white/70">Save sites or import from your browser in seconds.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#5ee7df]/20 text-sm font-semibold text-[#5ee7df]">2</span>
                    <div>
                      <div className="font-semibold">Turn on autofill</div>
                      <p className="text-sm text-white/70">Enable masterpassword for one-tap sign in.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#5ee7df]/20 text-sm font-semibold text-[#5ee7df]">3</span>
                    <div>
                      <div className="font-semibold">Stay alerted</div>
                      <p className="text-sm text-white/70">Get notified if any saved site is breached and swap passwords fast.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/5 bg-[#060a14] px-6 py-20 lg:px-16 xl:px-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Why SafePad</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Security that feels invisible, not intrusive.</h2>
              <p className="text-base text-white/70">
                People just want to log in and move on. SafePad keeps your accounts locked tight while staying effortless to use on phone, tablet, and laptop.
              </p>
            </div>

            <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-[#5ee7df] to-[#4da1ff] opacity-90" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 pb-24 pt-16 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-linear-to-r from-[#0c172d] via-[#0e1931] to-[#111c38] p-10 shadow-2xl">
            <div className="flex flex-col gap-6 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-white/50">Log in without stress</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Set up your vault in minutes.</h2>
              <p className="mx-auto max-w-2xl text-base text-white/70">
                Import saved passwords, generate stronger ones, and autofill everywhere. No meetings, no setup calls—just a safer way to sign in.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button className="h-12 rounded-xl bg-white text-base font-semibold text-[#0a1226] transition hover:-translate-y-0.5 hover:bg-white/90">
                    Create free account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="h-12 rounded-xl border-white/20 bg-white/5 px-6 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
                    I already use SafePad
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
