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

  const result = await pool.query(`
    SELECT uh.custom_hobby_name 
    FROM user_hobbies uh
    JOIN users u ON u.id = uh.user_id
    WHERE u.email = '${userLogin}';
  `);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);
  const { tableName, newData, rate, recordToUpdate } = body;

  const isHobbyInDB = await pool.query(`
    SELECT EXISTS (
      SELECT 1 
      FROM user_hobbies uh
      WHERE uh.user_id = ${userId}
      AND uh.custom_hobby_name = '${newData.name}'
    );
    `);

  if (!isHobbyInDB.rows[0].exists) {
    await pool.query(`
      INSERT INTO user_hobbies (user_id, custom_hobby_name) VALUES (${userId}, '${newData.name}');
      `);
  }

  return NextResponse.json(`Record created in Database`);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  const { tableName, newData, rate, recordToUpdate } = body;

  const valueToSet = recordToUpdate === "rate" ? rate : newData.name;

  if (recordToUpdate === "custom_hobby_name") {
    const query = await pool.query(`
    UPDATE user_hobbies SET ${recordToUpdate} = '${valueToSet}' WHERE user_id = ${userId} AND custom_hobby_name = '${newData.oldName}';
    `);
  }

  return NextResponse.json("Update successful!");
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  const { tableName, newData } = body;

  pool.query(`
    DELETE FROM user_hobbies WHERE user_id = ${userId} AND custom_hobby_name = '${newData}'
    `);

  return NextResponse.json("DELETE successful!");
}
