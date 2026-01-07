"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Thanks for reaching out. We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="p-8 bg-black text-white flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Contact SafePad</h1>
          <p className="mt-4 text-gray-300">
            Questions, feedback, or security concerns — reach out to us anytime.
            SafePad is built with transparency and user trust at its core.
          </p>

          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <p>Email: support@safepad.dev</p>
            <p>Security: security@safepad.dev</p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold">Send a message</h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              className="border rounded px-3 py-2"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="border rounded px-3 py-2"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              className="border rounded px-3 py-2 resize-none h-28"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
