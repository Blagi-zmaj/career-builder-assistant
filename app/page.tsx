"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PrimarySearchAppBar from "./tested_components/AppBar";
import Drawer from "./components/Drawer";
import ResponsiveStack from "./tested_components/Stack";
import { Grid, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import ResponsiveDrawer from "./components/Drawer";

export default function Home() {
  // const queryClient = new QueryClient()

  return (
    <main className={styles.main}>
      <Drawer />
    </main>
  );
}
