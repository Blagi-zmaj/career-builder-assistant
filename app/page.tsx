"use client";

import styles from "./page.module.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./components/Main";
import ResponsiveDrawer from "./components/DrawerWithoutHideMain";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (
      !window.localStorage.getItem("isLogged") ||
      window.localStorage.getItem("isLogged") === "false"
    ) {
      router.push("/login_page");
    }
  });

  return (
    <main className={styles.main}>
      <ResponsiveDrawer>
        <Main open={true} />
      </ResponsiveDrawer>
    </main>
  );
}
