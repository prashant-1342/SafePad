import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET() {
  try {
  
    const result = await db.query("SELECT COUNT(*) FROM items");
    const count = parseInt(result.rows[0].count, 10);
    
    return NextResponse.json({ vaultCount: count });
  } catch (error) {
   
    console.error("Error fetching stats:", error);
    return NextResponse.json({ vaultCount: 0 });
  }
}
