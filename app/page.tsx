"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CustomDrawer from "./components/CustomDrawer";
import Drawer from "./components/Drawer";
export default function Home() {
  // const queryClient = new QueryClient()

  return (
    <main className={styles.main}>
      {/* Create separate main component and add it as a prop to custom drawer! */}
      <Drawer />
    </main>
  );
}
