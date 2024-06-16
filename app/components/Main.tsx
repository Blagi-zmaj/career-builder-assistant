import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { DrawerHeader } from "../util/helpers";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { cardsDescriptions } from "../util/helpers";
import Link from "next/link";
import { pagesUrls, imagesSrc, drawerTabs } from "../util/helpers";
import MultiActionAreaCard from "./Cards";

export default function Main({ open }: { open: boolean }) {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ...(open && { display: { xs: "block", md: "block" } }),
        }}
      >
        <DrawerHeader />
        <br />
        <Typography gutterBottom variant="h6" component="div">
          Career Builder Studio
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div">
          Welcome to Career Builder!
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Explore possibilities offered by our app
        </Typography>
        <Divider />

        <br />
        <Typography gutterBottom variant="h6" component="div">
          Get started!
        </Typography>
        <Grid2
          container
          spacing={4}
          alignItems={"center"}
          justifyContent={"stretch"}
        >
          {cardsDescriptions.map((card, index) => {
            return (
              <Link
                key={"card" + index}
                href={pagesUrls[index]}
                style={{ textDecoration: "none" }}
              >
                <Grid2>
                  <MultiActionAreaCard
                    src={imagesSrc[index]}
                    title={drawerTabs[index]}
                    content={card}
                  />
                </Grid2>
              </Link>
            );
          })}
        </Grid2>
      </Box>
    </>
  );
}
