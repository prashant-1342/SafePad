import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000;

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, { otp, expiresAt: Date.now() + OTP_TTL_MS });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"SafePad" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your SafePad OTP",
      html: `
        <h2>SafePad Login</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully" });

  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}

export { otpStore };
