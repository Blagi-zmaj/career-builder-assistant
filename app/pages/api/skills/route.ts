import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

// export const GET = async function (req) {
//   // console.log(`req`, req.body);
//   const response = await fetch(
//     "https://nofluffjobs.com/pl/job/senior-fullstack-developer-react-node-js-xebia-remote-1"
//   );
//   const html = await response.text();
//   const dom = new JSDOM(html);
//   const document = dom.window.document;
//   const skills = document.querySelectorAll('[id^="item-tag-"]');
//   const elementsArray = Array.from(skills);
//   // console.log(elementsArray);
//   // elementsArray.forEach((element) => {
//   //   console.log(`ID: ${element.id}, Text: ${element.textContent?.trim()}`);
//   // });
//   const newArr = elementsArray.map((el) => el.textContent?.trim());
//   return NextResponse.json(newArr);
// };

// "https://nofluffjobs.com/pl/job/senior-fullstack-developer-react-node-js-xebia-remote-1"
export const POST = async function (req: NextRequest, res: NextResponse) {
  console.log(`reached POST method`);
  console.log(req.method);
  const body = await req.json();
  const { url } = body;

  console.log("url", url);

  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const skills = document.querySelectorAll('[id^="item-tag-"]');
  const elementsArray = Array.from(skills);
  // console.log(elementsArray);
  // elementsArray.forEach((element) => {
  //   console.log(`ID: ${element.id}, Text: ${element.textContent?.trim()}`);
  // });
  const newArr = elementsArray.map((el) => el.textContent?.trim());
  return NextResponse.json(newArr);
};
