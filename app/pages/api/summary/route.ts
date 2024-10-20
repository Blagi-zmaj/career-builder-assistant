import { NextResponse, NextRequest } from "next/server";
import pg from "pg";

const { Pool } = pg;

export const config = {
  runtime: "edge",
};

const getLoginFromUrl = function (url) {
  const regex = /login=([^&]*)/;
  const login = url.match(regex);
  return login[1];
};

const findUserIdInDB = async function (userLogin) {
  const userId = await pool.query(`
    SELECT id FROM users WHERE email = '${userLogin}';
    `);

  return userId.rows[0].id;
};

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export async function GET(req: NextRequest) {
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);
  const data = await pool.query(`
    SELECT s.description
    FROM summary s
    WHERE user_id = ${userId};
    `);
  return NextResponse.json(data.rows);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { description } = body;
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  const recordID = await pool.query(`
    SELECT id
    FROM summary
    WHERE user_id = ${userId};
    `);

  pool.query(`
    UPDATE summary SET description = '${description}' WHERE id = ${recordID.rows[0].id};
    `);

  return NextResponse.json("PATCH successful!");
}
