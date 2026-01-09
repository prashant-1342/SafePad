export const runtime = "nodejs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/app/lib/db";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const userCheck = await db.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );

    const userExists = userCheck.rows.length > 0;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = Date.now() + 5 * 60 * 1000;

    await db.query(
      `
      INSERT INTO otp_codes (email, otp, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (email)
      DO UPDATE SET otp = $2, expires_at = $3, created_at = CURRENT_TIMESTAMP
      `,
      [email, hashedOtp, expiresAt]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SafePad" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your SafePad OTP",
      html: `<h2>Your OTP</h2><h1>${otp}</h1><p>Valid for 5 minutes</p>`,
    });

    return NextResponse.json(
      { message: "OTP sent", userExists },
      { status: userExists ? 200 : 201 }
    );
  }catch (error) {
  console.error("SEND OTP ERROR:", error);
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}
}
