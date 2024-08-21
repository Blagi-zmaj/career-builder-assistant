"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useParams, usePathname } from "next/navigation";
import Drawer from "../components/Drawer";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();
  console.log(pathname);
  console.log(params.specialization);

  return (
    <>
      {/* <Drawer>
        <h1>{pathname}</h1>
        <h2>{params.specialization}</h2>
      </Drawer> */}
    </>
  );
}
