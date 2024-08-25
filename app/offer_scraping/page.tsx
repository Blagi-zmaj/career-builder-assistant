"use client";
import ResponsiveDrawer from "../components/DrawerWithoutHideMain";
import TransferList from "../components/JobOfferScraping/JobOfferScraping";

export default function OfferScrape({
  params,
}: {
  params: { specialization: string };
}) {
  return (
    <ResponsiveDrawer>
      <TransferList />
    </ResponsiveDrawer>
  );
}
