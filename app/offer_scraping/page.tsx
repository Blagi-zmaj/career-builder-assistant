"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";
import ImageUpload from "../components/ImageUpload";

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
      <ImageUpload />
    </>
  );
}
