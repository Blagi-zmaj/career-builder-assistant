"use client";

import { usePathname } from "next/navigation";
import Drawer from "../components/Drawer";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();

  return (
    <>
      <Drawer />
    </>
  );
}
