import { NextResponse } from "next/server";
import {db} from "@/app/lib/db";
import bcrypt from "bcrypt"
export const runtime = "nodejs";
export async function POST(request:Request) {
  try {
    const body = await request.json();
    const { name, email, masterpassword } = body;

    if(!name || !email || !masterpassword){
      return NextResponse.json(
        {message:"All field are required"},
        {status : 400},
      );
    }

    const result:any = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if(result.rows.length > 0){
      return NextResponse.json(
        {message:"User already exists"},
        {status : 409},
      );
    }
    const hashedpassword = await bcrypt.hash(masterpassword,10);
    await db.query(
   "INSERT INTO users (name, email, hashedpassword) VALUES ($1, $2, $3)",
      [name,email,hashedpassword] 
    );
    return NextResponse.json(
    {message:"user registered successfully"},
      {status:201},
    );
  } catch (error:any) {
  console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

}

