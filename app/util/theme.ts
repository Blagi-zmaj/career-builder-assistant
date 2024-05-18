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
          // color: "#B2D732",
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
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       color: "white",
    //     },
    //   },
    // },
  },

  palette: {
    contrastThreshold: 4.5,
    primary: {
      main: "#121212",
    },
    // Uncomment below to activate dark mode and comment above
    mode: "dark",
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 18,
  },
});

export default theme;
