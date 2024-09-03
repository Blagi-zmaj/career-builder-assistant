"use client";

import { usePathname } from "next/navigation";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();

  return <></>;
}
