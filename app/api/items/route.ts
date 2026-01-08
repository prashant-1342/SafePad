import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_email, name, username, password, url, type, notes, item_metadata } = body;

    const metadataString = typeof item_metadata === 'string' ? item_metadata : JSON.stringify(item_metadata);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        username TEXT,
        password TEXT,
        url TEXT,
        type VARCHAR(50) NOT NULL,
        notes TEXT,
        item_metadata TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await db.query(createTableQuery);

    try {
        await db.query("ALTER TABLE items ADD COLUMN IF NOT EXISTS notes TEXT");
    } catch (e: any) {
        // Column might already exist
    }

    try {
        await db.query("ALTER TABLE items ALTER COLUMN item_metadata TYPE TEXT");
    } catch (e: any) {
        // Type might already be correct
    }

    const insertQuery = `
      INSERT INTO items (user_email, name, username, password, url, type, notes, item_metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    
    await db.query(insertQuery, [user_email, name, username, password, url, type, notes, metadataString]);

    return NextResponse.json({ message: "Item added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        username TEXT,
        password TEXT,
        url TEXT,
        type VARCHAR(50) NOT NULL,
        notes TEXT,
        item_metadata TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    try {
        await db.query("ALTER TABLE items ADD COLUMN IF NOT EXISTS notes TEXT");
    } catch (e: any) {
        // Column might already exist
    }

    try {
         await db.query("ALTER TABLE items ALTER COLUMN item_metadata TYPE TEXT");
    } catch (e: any) {
        // Type might already be correct
    }

    const result:any = await db.query("SELECT * FROM items WHERE user_email = $1 ORDER BY created_at DESC", [email]);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, user_email, name, username, password, url, type, notes, item_metadata } = body;
    
        if (!id || !user_email) {
            return NextResponse.json({ message: "ID and Email required" }, { status: 400 });
        }

        const metadataString = typeof item_metadata === 'string' ? item_metadata : JSON.stringify(item_metadata);

        try {
            await db.query("ALTER TABLE items ALTER COLUMN item_metadata TYPE TEXT");
        } catch (e: any) {
            // Type might already be correct
        }
    
        const updateQuery = `
            UPDATE items 
            SET name=$1, username=$2, password=$3, url=$4, type=$5, notes=$6, item_metadata=$7
            WHERE id=$8 AND user_email=$9
        `;
    
        await db.query(updateQuery, [name, username, password, url, type, notes, metadataString, id, user_email]);
    
        return NextResponse.json({ message: "Item updated successfully" });
    } catch (error: any) {
        console.error("Error updating item:", error); 
        return NextResponse.json({ 
            message: "Failed to update item", 
            error: error.message 
        }, { status: 500 });
    }
}

