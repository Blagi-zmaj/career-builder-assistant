"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";
import ResponsiveDrawer from "../components/CVCreator/DrawerWithoutHideMain";
import CVCreator from "../components/CVCreator/CVCreator";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();
  console.log(pathname);
  console.log(params.specialization);

  return (
    <Drawer>
      <CVCreator />
    </Drawer>
  );
}
