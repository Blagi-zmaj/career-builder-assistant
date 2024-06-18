"use client";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";
import ResponsiveDrawer from "../components/CVCreator/DrawerWithoutHideMain";
import CVCreator from "../components/CVCreator/CVCreator";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  return (
    <ResponsiveDrawer>
      <CVCreator />
    </ResponsiveDrawer>
  );
}
