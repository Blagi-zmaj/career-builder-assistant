"use client";
import ResponsiveDrawer from "../components/DrawerWithoutHideMain";
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
