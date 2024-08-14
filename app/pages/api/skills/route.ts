import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

// export const GET = async function () {
//   console.log(`GET fetch...`);
//   const mockData = "GET data";

//   const response = await fetch("https://www.npmjs.com/package/puppeteer");
//   const html = await response.text();
//   const dom = new JSDOM(html);
//   const document = dom.window.document;

//   const downloads = document.querySelector("._9ba9a726")?.textContent;

//   return NextResponse.json({ downloads });
// };

export const GET = async function () {
  const response = await fetch(
    "https://nofluffjobs.com/pl/job/senior-fullstack-developer-react-node-js-xebia-remote-1"
  );
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  //working option!!!
  // const skills = document.querySelector(
  //   ".tw-mb-0.tw-flex.tw-flex-wrap.ng-star-inserted"
  // )?.textContent;

  // console.log("\n====skills====\n\n", skills);

  const skills = document.querySelectorAll('[id^="item-tag-"]');

  const elementsArray = Array.from(skills);
  console.log(elementsArray);
  elementsArray.forEach((element) => {
    console.log(`ID: ${element.id}, Text: ${element.textContent?.trim()}`);
  });

  const newArr = elementsArray.map((el) => el.textContent?.trim());

  // console.log(
  //   "\n====skills====\n\n",
  //   skills.forEach((el) => el)
  // );

  return NextResponse.json(newArr);
};

// export const POST = function () {
//   console.log(`POST fetch...`);
//   const mockData = "POST data";
//   return NextResponse.json({ mockData });
// };
