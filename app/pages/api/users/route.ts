import { NextRequest, NextResponse } from "next/server";
import pg from "pg";
const { Pool } = pg;

export const config = {
  runtime: "edge",
};

const userId = 2; // update in future to get email/login

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export async function GET(req: NextRequest) {
  const result = await pool.query(`SELECT * FROM users WHERE id=${userId};`);
  const { id, created_at, ...filteredObj } = result.rows[0];

  return new Promise((resolve) => {
    // setTimeout(() => {
    resolve(NextResponse.json(filteredObj));
    // }, 500);
  });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { tableName, recordToUpdate, newData } = body;
  await pool.query(
    `UPDATE ${tableName} SET ${recordToUpdate}='${newData}' WHERE id=${userId};`
  );
  return NextResponse.json("Update successful!");
}
