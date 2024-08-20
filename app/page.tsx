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
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const queryClient = new QueryClient()
  const router = useRouter();
  useEffect(() => {
    console.log("isLogged", window.localStorage.getItem("isLogged"));
    if (
      !window.localStorage.getItem("isLogged") ||
      window.localStorage.getItem("isLogged") === "false"
    ) {
      router.push("/login_page");
    }
  });

  return (
    <main className={styles.main}>
      <Drawer>
        <Main open={true} />
      </Drawer>
    </main>
  );
}
