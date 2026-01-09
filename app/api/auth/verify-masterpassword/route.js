import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcrypt"

export async function POST(req){
    const{email,masterpassword}= await req.json();
     if(!email || !masterpassword){
       return NextResponse.json({"Message":"Missing email or masterpassword"},{status:400})
     }
    try{
        const result = await db.query("Select * from users where email = $1",[email]);
        const rows = result.rows;
        if(rows.length === 0){
            return NextResponse.json({"Message":"User not found"},{status:404})
        }
        const user = rows[0];
        const isPasswordCorrect = await bcrypt.compare(masterpassword,user.hashedpassword)
        if(!isPasswordCorrect){
            return NextResponse.json("Invalid Password",{status : 401})
        }
       delete user.hashedpassword;
       return NextResponse.json({
        "Message":"Success",
        user
       },
    {status : 200})     
    }
    catch(err){
        console.error(err);
         return NextResponse.json("Invalid Server Error",{status:500})
    }
}