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
        SELECT lang.name, lang.rate
        FROM users u
        JOIN user_languages ul ON u.id = ul.user_id
        JOIN languages lang ON lang.id = ul.language_id
        WHERE u.email='daniel.konieczny@gmail.com';

    `);

  // console.log(result.rows);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
  });
}
