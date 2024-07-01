"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";
import ResponsiveDrawer from "../components/DrawerWithoutHideMain";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();
  console.log(pathname);
  console.log(params.specialization);

  return (
    <ResponsiveDrawer>
      <h1>Offer scraping</h1>
    </ResponsiveDrawer>
  );
}
