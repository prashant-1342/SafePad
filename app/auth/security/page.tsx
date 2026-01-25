import Navbar from "@/app/components/Navbar"
export default function Security() {
  return (
    
    
     <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pt-6">
      <Navbar/>
    
      <div className="mx-auto py-20 max-w-4xl space-y-20">

        <section className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight">
            Security at SafePad
          </h1>
          <p className="text-lg text-white/70">
            SafePad is built with a security-first mindset. The system is designed
            to protect user credentials even in the event of server compromise
            or unauthorized access.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Zero-knowledge architecture
          </h2>
          <p className="text-white/70 leading-relaxed">
            SafePad follows a zero-knowledge design. All sensitive data is encrypted
            before being stored, and the backend never has access to plaintext
            passwords or encryption keys.
          </p>
          <p className="text-white/70 leading-relaxed">
            This means the server can store and sync encrypted data, but it cannot
            read, decrypt, or recover user secrets.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Master password protection
          </h2>
          <p className="text-white/70 leading-relaxed">
            The master password is the single key used to unlock a user’s vault.
            It is never stored in plain form and is never sent to the server.
          </p>
          <p className="text-white/70 leading-relaxed">
            Only a cryptographic hash of the master password is stored for
            authentication. The original password exists only in the user’s
            session during vault access.
          </p>
        </section>

        <section className="space-y-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="text-2xl font-semibold text-red-400">
            What happens if you forget your master password?
          </h2>
          <p className="text-white/70 leading-relaxed">
            If the master password is lost, the encrypted vault cannot be unlocked.
            SafePad does not store recovery keys or backdoors that could be used
            to decrypt user data.
          </p>
          <p className="text-white/70 leading-relaxed">
            This is an intentional design decision. Allowing password recovery
            would require storing sensitive secrets, which would break the
            zero-knowledge security model.
          </p>
          <p className="text-white/70 leading-relaxed">
            In such cases, the only option is to reset the account and create a
            new vault.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Authentication and OTP verification
          </h2>
          <p className="text-white/70 leading-relaxed">
            SafePad uses email-based OTP verification during authentication to
            reduce the risk of unauthorized access and credential abuse.
          </p>
          <p className="text-white/70 leading-relaxed">
            OTP verification adds an additional security layer without exposing
            encryption keys or sensitive data.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Limitations and future improvements
          </h2>
          <p className="text-white/70 leading-relaxed">
            SafePad is an educational security-focused project. Advanced features
            such as hardware-backed key storage, passkeys, and encrypted key
            recovery mechanisms are planned for future iterations.
          </p>
        </section>

      </div>
    </div>
    
  );
}
