"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();

  return <></>;
}
