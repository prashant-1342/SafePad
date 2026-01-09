"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [masterpassword, setMasterPassword] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 200) {
        
        setStep(2);
      } else if (res.status === 201) {
       
        alert("This email is not registered. Please sign up first.");
        setLoading(false);
        return;
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        setStep(3);
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const handleVerifyMasterPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-masterpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, masterpassword: masterpassword }),
      });

      if (res.ok) {
        localStorage.setItem("userEmail", email);
        sessionStorage.setItem("masterPassword", masterpassword);
        router.push("/dashboard");
      } else {
        alert("Wrong Master Password");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back,</h1>
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
            Enter your personal details and start your journey with us
          </p>
        </div>
      </div>

      
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-login-card">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Login</h2>
            <p className="mt-2 text-gray-400 text-sm">
              Securely access your encrypted vault.
            </p>
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="mail@website.com"
                    className="w-full h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-base transition-colors duration-200"
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </Button>
                
                 <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="rounded bg-gray-700 border-gray-600" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <button type="button" className="hover:text-white">Forget password?</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300"
              >
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium text-gray-300">
                    Enter OTP sent to {email}
                  </label>
                  <input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    className="w-full h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest text-center text-xl"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-base transition-colors duration-200"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-gray-400 hover:text-white mt-2"
                >
                  Back to Email
                </button>
              </form>
            )}

            {step === 3 && (
              <form
                onSubmit={handleVerifyMasterPassword}
                className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300"
              >
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
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-base transition-colors duration-200"
                >
                  {loading ? "Decrypting..." : "Unlock Vault"}
                </Button>
              </form>
            )}

            <p className="text-center text-xs text-gray-500 mt-8">
              Not registered yet?{" "}
              <a href="/auth/signup" className="text-gray-300 hover:underline">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
