export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <section className="py-14 bg-black text-white text-center">
        <h1 className="text-3xl font-bold">Why SafePad?</h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-300">
          SafePad is a security-focused password manager designed to give users
          full control over their credentials using modern encryption practices.
        </p>
      </section>

      <section className="max-w-5xl mx-auto py-14 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <FeatureCard
            title="End-to-End Encryption"
            description="All passwords are encrypted before storage, ensuring that sensitive data is never exposed."
            icon="🔒"
          />

          <FeatureCard
            title="Master Password Protection"
            description="Your vault is protected using a master password known only to you and never stored in plain form."
            icon="🔑"
          />

          <FeatureCard
            title="Zero-Knowledge Design"
            description="SafePad follows a zero-knowledge approach where even the backend cannot read user secrets."
            icon="🙈"
          />

          <FeatureCard
            title="OTP-Based Authentication"
            description="Email-based OTP verification ensures only authorized users can access their account."
            icon="🛡️"
          />

          <FeatureCard
            title="Platform Independent"
            description="SafePad is not tied to any single browser or ecosystem, giving users full flexibility."
            icon="🌐"
          />

          <FeatureCard
            title="Modern Full-Stack Architecture"
            description="Built using Next.js API routes, secure hashing, and scalable backend design."
            icon="⚙️"
          />

        </div>
      </section>

      
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-semibold">Security built with intent</h2>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          SafePad is designed to demonstrate how a modern password manager can be
          implemented with transparency, security, and control.
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
    <div className="bg-white border rounded-lg p-5">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
