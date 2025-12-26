import { NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const entry = otpStore.get(email);
    if (!entry) {
      return NextResponse.json(
        { error: "OTP not found or expired" },
        { status: 400 }
      );
    }

    const storedOtp = typeof entry === "string" ? entry : entry.otp;
    const expiresAt = typeof entry === "string" ? null : entry.expiresAt;

    if (expiresAt && Date.now() > expiresAt) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: "OTP expired" },
        { status: 410 }
      );
    }

    if (String(otp).trim() !== String(storedOtp)) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 401 }
      );
    }

    otpStore.delete(email);

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
