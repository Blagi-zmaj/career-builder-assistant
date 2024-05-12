"use client";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";

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
      <Drawer />
    </>
  );
}
