import { NextResponse, NextRequest } from "next/server";
import pg from "pg";

const { Pool } = pg;

export const config = {
  runtime: "edge",
};

let userId = 1;

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export async function GET() {
  const result = await pool.query(`
    SELECT us.custom_skill_name, us.rate
    FROM users u
    JOIN user_skills us ON u.id = us.user_id
    JOIN skills s ON s.id = us.skill_id
    WHERE u.email='daniel.konieczny@gmail.com';
  `);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tableName, newData, rate, recordToUpdate } = body;
  const isRecordInDB = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM ${tableName} WHERE name='${newData.name}')`
  );

  if (!isRecordInDB.rows[0].exists) {
    await pool.query(`INSERT INTO skills(name) VALUES ('${newData.name}')`);
  }

  // find if record exists for user
  const isSkillInDB = await pool.query(`
    SELECT EXISTS (
      SELECT 1 
      FROM user_skills us
      JOIN skills s ON us.skill_id = s.id
      WHERE us.user_id = ${userId}
      AND s.name = '${newData.name}'
    )
    `);

  const findSkill = await pool.query(`
      SELECT id, name 
      FROM skills
      WHERE name = 'AI';
    `);

  if (!isSkillInDB.rows[0].exists) {
    await pool.query(`
      WITH found_skill AS (
        SELECT id
        FROM skills
        WHERE name = '${newData.name}'
      )
      INSERT INTO user_skills (user_id, skill_id, rate, custom_skill_name)
      SELECT ${userId}, id, ${newData.level}, '${newData.name}'
      FROM found_skill;
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
  const { tableName, newData } = body;

  pool.query(`
    DELETE FROM user_skills WHERE user_id = ${userId} AND custom_skill_name = '${newData}'
    `);

  return NextResponse.json("DELETE successful!");
}
