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
    SELECT ue.institution_name, ue.position_name, ue.start_date, ue.end_date, ue.description
    FROM users u
    JOIN user_experience ue ON u.id = ue.user_id
    WHERE user_id = ${userId};
    `);
  return NextResponse.json(data.rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData } = body;
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);
  await pool.query(`
    INSERT INTO user_experience (user_id, institution_name, position_name, start_date, end_date, description)
    VALUES (${userId}, '${newData.institution}', '${newData.position}', '${newData.startDate}', '${newData.endDate}', '${newData.description}');
    `);

  return NextResponse.json("POST successful!");
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData, recordToUpdate } = body;
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  // find record ID in DB

  // UPDATE RECORD BASED ON ABOVE ID FOUND IN DB
  return NextResponse.json("PATCH successful!");
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData } = body;
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  await pool.query(`
    DELETE FROM user_experience WHERE user_id = ${userId} AND institution_name = '${newData.institution}' AND position_name = '${newData.position}'
    `);

  return NextResponse.json("DELETE successful!");
}
