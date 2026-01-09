export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const result = await db.query(
      "SELECT otp, expires_at FROM otp_codes WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "OTP not found" }, { status: 400 });
    }

    const { otp: storedOtp, expires_at } = result.rows[0];

    if (Date.now() > Number(expires_at)) {
      await db.query("DELETE FROM otp_codes WHERE email = $1", [email]);
      return NextResponse.json({ error: "OTP expired" }, { status: 410 });
    }

    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(String(otp).trim())
      .digest("hex");

    if (hashedInputOtp !== storedOtp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    await db.query("DELETE FROM otp_codes WHERE email = $1", [email]);

    return NextResponse.json({ message: "OTP verified" });
  } catch (e) {
    console.error("VERIFY OTP ERROR:", e);
    return NextResponse.json(
      { error: "OTP verification failed" },
      { status: 500 }
    );
  }
}
