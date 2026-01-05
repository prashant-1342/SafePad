import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_email, name, username, password, url, type, notes, item_metadata } = body;

    const metadataString = typeof item_metadata === 'string' ? item_metadata : JSON.stringify(item_metadata);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
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
    await db.execute(createTableQuery);

    try {
        await db.execute("ALTER TABLE items ADD COLUMN notes TEXT");
    } catch (e: any) {
        if (e.code !== 'ER_DUP_FIELDNAME') throw e;
    }

    try {
        await db.execute("ALTER TABLE items MODIFY COLUMN item_metadata TEXT");
    } catch (e: any) {
        
    }

    const insertQuery = `
      INSERT INTO items (user_email, name, username, password, url, type, notes, item_metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await db.execute(insertQuery, [user_email, name, username, password, url, type, notes, metadataString]);

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

    await db.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
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
        await db.execute("ALTER TABLE items ADD COLUMN notes TEXT");
    } catch (e: any) {
        if (e.code !== 'ER_DUP_FIELDNAME') throw e;
    }

    try {
         await db.execute("ALTER TABLE items MODIFY COLUMN item_metadata TEXT");
    } catch (e: any) {
    }

    const [rows] = await db.execute("SELECT * FROM items WHERE user_email = ? ORDER BY created_at DESC", [email]);
    return NextResponse.json(rows);
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
            await db.execute("ALTER TABLE items MODIFY COLUMN item_metadata TEXT");
        } catch (e: any) {
            if (e.code !== 'ER_DUP_FIELDNAME') throw e;
        }
    
        const updateQuery = `
            UPDATE items 
            SET name=?, username=?, password=?, url=?, type=?, notes=?, item_metadata=?
            WHERE id=? AND user_email=?
        `;
    
        await db.execute(updateQuery, [name, username, password, url, type, notes, metadataString, id, user_email]);
    
        return NextResponse.json({ message: "Item updated successfully" });
    } catch (error: any) {
        console.error("Error updating item:", error); 
        return NextResponse.json({ 
            message: "Failed to update item", 
            error: error.message 
        }, { status: 500 });
    }
}
