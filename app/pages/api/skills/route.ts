import { NextResponse, NextRequest } from "next/server";
import pg from "pg";

const { Pool } = pg;

export const config = {
  runtime: "edge",
};

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

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

export async function GET(req: NextRequest) {
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  const result = await pool.query(`
    SELECT us.custom_skill_name, us.rate
    FROM users u
    JOIN user_skills us ON u.id = us.user_id
    WHERE u.email='${userLogin}';
  `);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData, rate, recordToUpdate } = body;
  const { url } = req;
  const userLogin = getLoginFromUrl(url);
  const userId = await findUserIdInDB(userLogin);

  const isSkillInDB = await pool.query(`
    SELECT EXISTS (
      SELECT 1 
      FROM user_skills us
      WHERE us.user_id = ${userId}
      AND us.custom_skill_name = '${newData.name}'
    );
    `);

  if (!isSkillInDB.rows[0].exists) {
    await pool.query(`
      INSERT INTO user_skills (user_id, rate, custom_skill_name) VALUES (${userId}, ${newData.level}, '${newData.name}');
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

  if (recordToUpdate === "rate") {
    await pool.query(`
      update user_skills set ${recordToUpdate} = ${valueToSet} where custom_skill_name = '${newData.name}' and user_id = ${userId};
    `);
  }

  if (recordToUpdate === "custom_skill_name") {
    const query = await pool.query(`
    UPDATE user_skills SET ${recordToUpdate} = '${valueToSet}' WHERE user_id = ${userId} AND custom_skill_name = '${newData.oldName}';
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
    DELETE FROM user_skills WHERE user_id = ${userId} AND custom_skill_name = '${newData}'
    `);

  return NextResponse.json("DELETE record successful!");
}
