"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Drawer from "../components/Drawer";
import { usePathname } from "next/navigation";
import ResponsiveDrawer from "../components/DrawerWithoutHideMain";
import TransferList from "../components/JobOfferScraping/JobOfferScraping";
import Home from "../components/JobOfferScraping/localStorageTest";
import { useEffect, useState } from "react";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();
  // console.log(pathname);
  // console.log(params.specialization);

  const [skillsFromOffer, setSkillsFromOffer] = useState([]);

  useEffect(() => {
    const response = fetch("pages/api/skills", { method: "GET" });
    // console.log(response);
    response
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSkillsFromOffer(data);
      });
  }, []);

  console.log(skillsFromOffer);

  return (
    <ResponsiveDrawer>
      <TransferList skillsFromOffer={skillsFromOffer} />
      {/* <Home /> */}
    </ResponsiveDrawer>
  );
}
