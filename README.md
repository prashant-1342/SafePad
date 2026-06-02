<div align="center">

# 🔐 SafePad

**A security-first password manager built with Next.js**

*End-to-end encryption · Zero-knowledge architecture · OTP authentication*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 🌟 Overview

SafePad is a full-stack password manager that puts security and privacy first. Every credential is **encrypted on the client** before it ever reaches the server — meaning your plaintext secrets are never exposed, stored, or transmitted. Built as a showcase of modern encryption practices, zero-knowledge design, and a clean full-stack architecture.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔒 **End-to-End Encryption** | All vault items are encrypted client-side using **AES-256** via CryptoJS before storage |
| 🧠 **Zero-Knowledge Architecture** | The server never sees or can decrypt your passwords — privacy by design |
| 🔑 **Master Password Protection** | Your vault key is derived locally using **Argon2id** and never stored or transmitted |
| 🛡️ **OTP Email Authentication** | Email-based one-time password verification during signup for account security |
| ⚡ **Password Generator** | Generate strong passwords, memorable passphrases, and random usernames |
| 🗂️ **Vault Management** | Store logins, secure notes, and other credentials with full CRUD support |
| 🔍 **Search & Filter** | Quickly find items by name, type, or keyword across your vault |
| 📱 **Responsive UI** | Clean, dark-themed interface that works across devices |

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- [Radix UI](https://www.radix-ui.com/)

**Security & Crypto**
- [CryptoJS](https://github.com/brix/crypto-js) — AES-256 client-side encryption
- [hash-wasm](https://github.com/nicktom1034/hash-wasm) — Argon2id key derivation (WebAssembly)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — Server-side password hashing
- [Argon2 WASM](https://github.com/nicktom1034/argon2-browser) — In-browser key stretching

**Backend**
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL](https://www.postgresql.org/) via [pg](https://node-postgres.com/)
- [Nodemailer](https://nodemailer.com/) — OTP email delivery

---

## 🔐 Security Architecture

SafePad uses a **dual-key derivation** system powered by Argon2id:

```
Master Password + Email
        │
        ├──▶  deriveAuthHash()  ──▶  Sent to server for login verification
        │     (salt: email + "_safepad_auth_v1")
        │
        └──▶  deriveEncryptionKey()  ──▶  Used only client-side to encrypt/decrypt vault
              (salt: email + "_safepad_enc_v1")
```

- The **auth hash** authenticates the user — the server never sees the raw master password.
- The **encryption key** never leaves the browser — the server only stores AES-256 ciphertext.
- Even a full database breach exposes **no readable passwords**.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- SMTP credentials (for OTP emails)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/safepad.git
cd safepad

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/safepad

# Email (for OTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_smtp_password
SMTP_FROM=noreply@safepad.com
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
safepad/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── send-otp/       # Email OTP generation
│   │   │   ├── verify-otp/     # OTP verification
│   │   │   ├── signup/         # User registration
│   │   │   ├── contactAuth/    # Contact authentication
│   │   │   └── verify-masterpassword/
│   │   ├── items/              # Vault CRUD operations
│   │   └── stats/              # Public statistics
│   ├── auth/
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup with OTP flow
│   │   ├── features/           # Features showcase
│   │   ├── security/           # Security info page
│   │   └── extension/          # Browser extension info
│   ├── dashboard/              # Main vault dashboard
│   ├── lib/
│   │   ├── crypto-client.ts    # AES-256 encrypt/decrypt
│   │   ├── security.ts         # Argon2id key derivation
│   │   ├── generator.ts        # Password/passphrase/username generator
│   │   └── db.js               # Database connection
│   └── components/             # Navbar, Footer
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── VaultContent.tsx
│   │   ├── GeneratorContent.tsx
│   │   └── Modals/             # Add/Edit/Details modals
│   └── forms/
│       └── ItemForms.tsx
└── public/
    └── lib/
        ├── argon2.wasm         # Argon2 WebAssembly binary
        └── argon2-simd.wasm
```

---

## 🖥️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Landing page with feature highlights |
| `/auth/signup` | Register with email OTP verification |
| `/auth/login` | Login with master password |
| `/dashboard` | Main vault — view, add, edit, delete items |
| `/auth/features` | Feature overview |
| `/auth/security` | Security model explanation |
| `/auth/extension` | Browser extension information |

---

## 🏗️ Building for Production

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using Next.js · Secured with AES-256 & Argon2id

</div>
