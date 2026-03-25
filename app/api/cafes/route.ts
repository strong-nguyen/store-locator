// app/api/cafes/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL, // Lưu trong file .env
    user: 'postgres',
    host: 'localhost',
    database: 'map_features_db',
    password: '1610',
    port: 5432,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lng = searchParams.get('lng');
    const lat = searchParams.get('lat');

    try {
        const query = `
      SELECT id, name, phone, 
             ST_X(geom::geometry) as lng, 
             ST_Y(geom::geometry) as lat,
             ST_Distance(geom, ST_MakePoint($1, $2)::geography) as distance
      FROM features.cafe
      ORDER BY geom <-> ST_MakePoint($1, $2)::geography
      LIMIT 5;
    `;
        const result = await pool.query(query, [lng, lat]);

        return NextResponse.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}