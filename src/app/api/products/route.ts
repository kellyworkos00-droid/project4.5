import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const products = await sql`
      SELECT * FROM products ORDER BY id DESC
    `;
    return Response.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    
    const result = await sql`
      INSERT INTO products (name, description, price, image, images, rating, category)
      VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image}, 
              ${JSON.stringify(product.images || [])}, ${product.rating}, ${product.category})
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const product = await request.json();
    
    const result = await sql`
      UPDATE products 
      SET name = ${product.name}, 
          description = ${product.description}, 
          price = ${product.price}, 
          image = ${product.image}, 
          images = ${JSON.stringify(product.images || [])}, 
          rating = ${product.rating}, 
          category = ${product.category}
      WHERE id = ${product.id}
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM products WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
