"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Drawer from "./components/Drawer";
import Main from "./components/Main";
import { Box } from "@mui/material";

export default function Home() {
  // const queryClient = new QueryClient()

  return (
    <main className={styles.main}>
      <Drawer>
        <Main open={true} />
      </Drawer>
    </main>
  );
}
