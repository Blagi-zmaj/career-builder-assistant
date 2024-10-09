import { NextResponse, NextRequest } from "next/server";
import pg from "pg";

const { Pool } = pg;

export const config = {
  runtime: "edge",
};

const userId = 1;

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export async function GET() {
  const result = await pool.query(`
    SELECT ul.rate, ul.custom_language_name
    FROM user_languages ul
    JOIN users u ON u.id = ul.user_id
    WHERE u.email = 'daniel.konieczny@gmail.com';
  `);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData, rate, recordToUpdate } = body;

  const isLanguageInDB = await pool.query(`
    SELECT EXISTS (
      SELECT 1 
      FROM user_languages ul
      WHERE ul.user_id = ${userId}
      AND ul.custom_language_name = '${newData.name}'
    );
    `);

  if (!isLanguageInDB.rows[0].exists) {
    await pool.query(`
      INSERT INTO user_languages (user_id, rate, custom_language_name) VALUES (${userId}, ${newData.level}, '${newData.name}');
      `);
  }

  return NextResponse.json(`Record created in Database`);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData, rate, recordToUpdate } = body;

  const valueToSet = recordToUpdate === "rate" ? rate : newData.name;

  if (recordToUpdate === "rate") {
    await pool.query(`
      update user_languages set ${recordToUpdate} = ${valueToSet} where custom_language_name = '${newData.name}' and user_id = ${userId};
    `);
  }

  if (recordToUpdate === "custom_language_name") {
    const query = await pool.query(`
    UPDATE user_languages SET ${recordToUpdate} = '${valueToSet}' WHERE user_id = ${userId} AND custom_language_name = '${newData.oldName}';
    `);
  }

  return NextResponse.json("Update successful!");
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData } = body;

  pool.query(`
    DELETE FROM user_languages WHERE user_id = ${userId} AND custom_language_name = '${newData}'
    `);

  return NextResponse.json("DELETE successful!");
}
