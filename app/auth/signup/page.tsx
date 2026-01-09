"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [masterpassword, setMasterPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async () => {
    if (!email) return;

    setLoading(true);
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.status === 201) setOtpSent(true);
    if (res.status === 200) alert("Email already registered");
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    setLoading(true);
    const verify = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (verify.ok) {
      setIsOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP");
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpVerified) return;

    setLoading(true);

    const signup = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        masterpassword,
      }),
    });

    if (signup.status === 201) {
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full bg-login-bg text-white overflow-hidden font-sans">
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/login-bg.png"
            alt="Mountain Landscape"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Join Us,</h1>
          <div className="mt-8 mb-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-4xl font-bold text-white">SafePad</span>
            </div>
          </div>
          <p className="text-lg text-gray-300 max-w-md">
            Create your account and start securing your digital life.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-login-card">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="mt-2 text-gray-400 text-sm">
              Sign up to get started with secure password management.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="email"
                  placeholder="mail@website.com"
                  className="flex-1 h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={otpSent}
                />
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading || otpSent || !email}
                  className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                >
                  {otpSent ? "✓ Sent" : "Send OTP"}
                </Button>
              </div>
              {otpSent && (
                <p className="text-xs text-green-400">
                  OTP sent to {email}. Check your inbox!
                </p>
              )}
            </div>

            {otpSent && (
              <div className="space-y-2 animate-in fade-in slide-in-from-right-8 duration-300">
                <label htmlFor="otp" className="text-sm font-medium text-gray-300">
                  Enter OTP
                </label>
                <div className="flex gap-2">
                  <input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    className="flex-1 h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest text-center text-xl"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    disabled={isOtpVerified}
                  />
                  {!isOtpVerified && (
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={loading || !otp}
                      className="h-12 px-4 bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200"
                    >
                      Verify
                    </Button>
                  )}
                  {isOtpVerified && (
                    <div className="h-12 px-4 flex items-center justify-center bg-green-900/30 text-green-400 rounded-lg border border-green-500/50 font-medium">
                      ✓ Verified
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="masterpassword" className="text-sm font-medium text-gray-300">
                Master Password
              </label>
              <input
                id="masterpassword"
                type="password"
                placeholder="Min. 8 characters"
                className="w-full h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={masterpassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !isOtpVerified}
              className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            {!otpSent && (
              <p className="text-xs text-gray-500 text-center">
                Click "Send OTP" to verify your email before signing up
              </p>
            )}
            {otpSent && !isOtpVerified && (
              <p className="text-xs text-yellow-500 text-center font-medium">
                Please verify your OTP before clicking Sign Up
              </p>
            )}
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            Already have an account?{" "}
            <a href="/auth/login" className="text-gray-300 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
