import { NextResponse, NextRequest } from "next/server";
import { JSDOM } from "jsdom";

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
