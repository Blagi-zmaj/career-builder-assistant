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
    SELECT s.name, us.rate
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
  console.log("==================POST method=======================");
  const body = await req.json();
  const { tableName, newData } = body;
  console.log("newData.name", newData);
  const isRecordInDB = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM ${tableName} WHERE name='${newData.name}')`
  );
  console.log("isRecordInDB.rows[0].exists", isRecordInDB.rows[0].exists);

  if (!isRecordInDB.rows[0].exists) {
    console.log(
      `Record is not in DB! Add record ${newData.name} to user_${tableName}`
    );

    pool.query(`INSERT INTO skills(name) VALUES ('${newData.name}')`);
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
  console.log("isSkillInDB", isSkillInDB.rows[0].exists);

  if (!isSkillInDB.rows[0].exists) {
    console.log(
      `Skill ${newData.name} with rate ${newData.level} added for user with id=${userId}`
    );
    pool.query(`
      WITH found_skill AS (
        SELECT id
        FROM skills
        WHERE name = '${newData.name}'
      )
  
      INSERT INTO user_skills(user_id, skill_id, rate)
      SELECT ${userId}, id, ${newData.level}
      FROM found_skill;
    `);
  }

  return NextResponse.json(`Record created in Database`);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { tableName, recordToUpdate, newData } = body;
  await pool.query(
    `UPDATE ${tableName} SET ${recordToUpdate}='${newData}' WHERE id=${userId};`
  );
  return NextResponse.json("Update successful!");
}
