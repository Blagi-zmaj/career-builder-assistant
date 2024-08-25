"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "2rem",
          color: "#66B3FF",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          backgroundColor: "#121212",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
        },
      },
    },
  },

  palette: {
    contrastThreshold: 4.5,
    primary: {
      main: "#121212",
    },
    mode: "dark",
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 18,
  },
});

export default theme;
