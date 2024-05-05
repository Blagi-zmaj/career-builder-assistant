"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useParams, usePathname } from "next/navigation";
import PrimarySearchAppBar from "../tested_components/AppBar";
import Drawer from "../components/Drawer";
import MiniDrawer from "../components/Drawer";
import MultiActionAreaCard from "../components/Cards";

export default function CareerAdvisor() {
  return (
    <>
      <Drawer key="tomcioPaluch" />
    </>
  );
}
