import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, masterpassword } = body;


    console.log("Signup Request Received!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Master Password:", masterpassword);

    return NextResponse.json({ message: "User registered successfully (Mock)" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}

