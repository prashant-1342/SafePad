"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/auth/contactAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl">

        {/* Left */}
        <div className="relative p-10 text-white flex flex-col justify-center bg-gradient-to-br from-blue-600/20 to-cyan-400/10">
          <h1 className="text-4xl font-bold tracking-tight">
            Contact <span className="text-blue-400">SafePad</span>
          </h1>
          <p className="mt-5 text-gray-300 leading-relaxed">
            Questions, feedback, or security concerns?
            We value transparency and responsible disclosure.
          </p>

          <div className="mt-8 space-y-2 text-sm text-gray-400">
            <p>📧 support@safepad.dev</p>
            <p>🔐 security@safepad.dev</p>
          </div>
        </div>

        {/* Right */}
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-white">
            Send a message
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

            <input
              className="rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              className="rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              className="rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 bg-blue-600 hover:bg-blue-500 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {status === "success" && (
              <p className="text-sm text-green-400">
                Message sent successfully. We’ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
