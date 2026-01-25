import Navbar from "@/app/components/Navbar"
export default function FeaturesPage() {
  return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pt-6">
      <Navbar/> 
      <section className="relative overflow-hidden py-6 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_60%)]" />
        <h1 className="relative text-4xl md:text-5xl font-bold tracking-tight">
          Why <span className="text-blue-500">SafePad</span>?
        </h1>
        <p className="relative mt-6 max-w-2xl mx-auto text-gray-300 text-lg">
          A security-first password manager built to demonstrate modern encryption,
          zero-knowledge design, and full user control.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          <FeatureCard
            title="End-to-End Encryption"
            description="All secrets are encrypted on the client before storage, ensuring no plaintext exposure."
            icon="🔒"
          />

          <FeatureCard
            title="Master Password Protection"
            description="Your vault is secured by a master password that is never stored or transmitted."
            icon="🔑"
          />

          <FeatureCard
            title="Zero-Knowledge Architecture"
            description="SafePad cannot see or decrypt your data — privacy by design."
            icon="🙈"
          />

          <FeatureCard
            title="OTP-Based Authentication"
            description="Email OTP verification adds an additional layer of account security."
            icon="🛡️"
          />

          <FeatureCard
            title="Platform Independent"
            description="Works across devices and environments without locking you into a single ecosystem."
            icon="🌐"
          />

          <FeatureCard
            title="Modern Full-Stack Build"
            description="Powered by Next.js APIs, secure hashing, and scalable backend patterns."
            icon="⚙️"
          />

        </div>
      </section>

      <section className="border-t border-white/10 py-16 text-center bg-black/40 backdrop-blur">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Security built with intent
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-400">
          SafePad focuses on correctness, transparency, and strong cryptographic
          foundations — not shortcuts.
        </p>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
 
    <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]">

      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  
  );
}
