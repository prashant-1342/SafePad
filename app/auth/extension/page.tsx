import Navbar from "@/app/components/Navbar";

export default function Extension() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pt-6">
      <Navbar />

      <div className="mx-auto py-20 px-6 max-w-4xl space-y-20">

        <section className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight">
            SafePad Browser Extension
          </h1>
          <p className="text-lg text-white/70">
            The SafePad browser extension is designed to make password access
            faster and safer during everyday browsing, without compromising
            the core security principles of the platform.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Secure autofill experience
          </h2>
          <p className="text-white/70 leading-relaxed">
            The extension allows users to autofill credentials directly into
            login forms, reducing the need to manually copy passwords or keep
            them exposed on the screen.
          </p>
          <p className="text-white/70 leading-relaxed">
            Autofill actions are initiated by the user and work only after the
            vault is unlocked, ensuring credentials are never filled silently
            or without consent.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            End-to-end encrypted access
          </h2>
          <p className="text-white/70 leading-relaxed">
            All sensitive data accessed by the extension remains encrypted.
            Decryption happens locally within the user’s session and never on
            external servers.
          </p>
          <p className="text-white/70 leading-relaxed">
            The extension does not store plaintext passwords, session secrets,
            or master keys on disk.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Website matching and control
          </h2>
          <p className="text-white/70 leading-relaxed">
            SafePad matches saved credentials with the active website domain
            to prevent accidental password misuse across similar-looking sites.
          </p>
          <p className="text-white/70 leading-relaxed">
            Users retain full control over when and where credentials are used,
            helping reduce phishing and credential stuffing risks.
          </p>
        </section>

        <section className="space-y-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <h2 className="text-2xl font-semibold text-blue-400">
            Current development status
          </h2>
          <p className="text-white/70 leading-relaxed">
            The browser extension is currently under active development and
            testing. Core security workflows are prioritized before public
            release.
          </p>
          <p className="text-white/70 leading-relaxed">
            Initial support is planned for Chromium-based browsers, with
            additional browser support considered in future updates.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Planned improvements
          </h2>
          <p className="text-white/70 leading-relaxed">
            Future versions aim to include features such as password generation,
            vault lock timers, and tighter integration with the SafePad web app.
          </p>
        </section>

      </div>
    </div>
  );
}
