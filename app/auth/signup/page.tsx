"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, masterpassword: masterPassword }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert(data.message || "Registration successful");
        router.push("/dashboard");
      } 
      else if(response.status === 400 || response.status === 409){
        alert(data.message)
      }
      else{
        alert(data.message || 
          "Something went wrong"
        )
      }
    } catch (error) {
      console.log(error);
      alert("Network error");
    } finally {
      setLoading(false);
    }
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
              Sign up to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
              <label htmlFor="masterpassword" className="text-sm font-medium text-gray-300">
                Master Password
              </label>
              <input
                id="masterpassword"
                type="password"
                placeholder="Min. 8 characters"
                className="w-full h-12 px-4 rounded-lg bg-login-input border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-base transition-colors duration-200"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
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
