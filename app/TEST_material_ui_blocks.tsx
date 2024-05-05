"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PrimarySearchAppBar from "./tested_components/AppBar";
import ResponsiveStack from "./tested_components/Stack";
import { Grid, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import TemporaryDrawer from "./components/Drawer";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // const queryClient = new QueryClient()

  return (
    <main className={styles.main}>
      <PrimarySearchAppBar />
      <Grid container border={2} columns={12} spacing={0}>
        <Grid
          xs={12}
          md={6}
          lg={4}
          border={1}
          padding={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          DRAWER
        </Grid>
        <Grid container xs={12} md={6} lg={8} border={1}>
          CONTENT
          <Grid
            xs={6}
            sm={3}
            lg={2}
            border={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Nested content
          </Grid>
          {/* <Stack>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
          </Stack> */}
          <ResponsiveStack />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Link href="/career_advisor">career_advisor</Link>
        <Link href="/cv_creator">cv_creator</Link>
        <Link href="/offer_scraping">offer_scraping</Link>
        <Link href="/statistics">statistics</Link>
        <Link href="/your_career">your_career</Link>
        <Link href="/machine_learning">machine_learning</Link>
        <div className={styles.link}>
          <Link href="/deep_learning">deep learning </Link>
        </div>
      </Stack>
      {/* <TemporaryDrawer /> */}
    </main>
  );
}
