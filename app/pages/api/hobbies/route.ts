import { NextResponse, NextRequest } from "next/server";
import pg from "pg";

const { Pool } = pg;

export const config = {
  runtime: "edge",
};

const userId = 2;

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export async function GET() {
  const result = await pool.query(`
        SELECT u.name, h.name
        FROM users u
        JOIN user_hobbies uh ON u.id = uh.user_id
        JOIN hobbies h ON h.id = uh.hobby_id
       WHERE u.email='daniel.konieczny@gmail.com';
    `);

  console.log(result.rows);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
  });
}
