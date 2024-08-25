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

  return <></>;
}
