import { NextResponse, NextRequest } from "next/server";
import { JSDOM } from "jsdom";
import pg from "pg";

export const POST = async function (req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { url } = body;
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const skills = document.querySelectorAll('[id^="item-tag-"]');
  const elementsArray = Array.from(skills);
  const newArr = elementsArray.map((el) => el.textContent?.trim());
  return NextResponse.json(newArr);
};

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
    SELECT s.name, s.rate 
    FROM users u
    JOIN user_skills us ON u.id = us.user_id
    JOIN skills s ON s.id = us.skill_id
    WHERE u.email='daniel.konieczny@gmail.com';
  `);

  return new Promise((resolve) => {
    resolve(NextResponse.json(result.rows));
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
