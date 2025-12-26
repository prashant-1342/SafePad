import { NextResponse } from "next/server";
import {db} from "@/app/lib/db";
import bcrypt from "bcrypt"
export const runtime = "nodejs";
export async function POST(request:Request) {
  try {
    const body = await request.json();
    const { name, email, master_password } = body;

    if(!name || !email || !master_password){
      return NextResponse.json(
        {message:"All field are required"},
        {status : 400},
      );
    }

    const hashedpassword = await bcrypt.hash(master_password,10);

    await db.execute(
   "INSERT INTO users (name, email, hashedpassword) VALUES (?, ?, ?)",
      [name,email,hashedpassword]
    );

    return NextResponse.json(
    {message:"user registered successfully"},
      {status:201},
    );
  } catch (error:any) {
    console.error("Signup error:", error);
   if(error.code === "ER_DUP_ENTRY"){
     return NextResponse.json(
      {message:"Email already exists"},
      {status:409}
     );
   }
  }

  return NextResponse.json(
    {message: "Error registering user"},
    {status:500}
  );


}

