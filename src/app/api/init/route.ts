import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // Create products table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price TEXT,
        image TEXT,
        images JSONB DEFAULT '[]',
        rating INTEGER DEFAULT 5,
        category TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    return Response.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return Response.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}
