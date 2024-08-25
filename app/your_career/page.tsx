"use client";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";

import CVCreator from "../components/CVCreator/CVCreator";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();

  return (
    <Drawer>
      <CVCreator />
    </Drawer>
  );
}
