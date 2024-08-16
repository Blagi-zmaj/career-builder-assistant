import * as React from "react";
import { styled, Theme, CSSObject, alpha } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import InputBase from "@mui/material/InputBase";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import InsightsIcon from "@mui/icons-material/Insights";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import SwitchAccountSharpIcon from "@mui/icons-material/SwitchAccountSharp";
import LocalOfferSharpIcon from "@mui/icons-material/LocalOfferSharp";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";

export const pagesUrls: string[] = [
  "/your_career",
  "/cv_creator",
  "/offer_scraping",
  "/statistics",
  "/career_advisor",
];

export const drawerTabs: string[] = [
  "Your career",
  "CV Creator",
  "Get offer data",
  "Statistics",
  "Career advisor",
];

export const imagesSrc: string[] = [
  "career_advisor.jpg",
  "cv_creator.jpg",
  "offer_scraping.jpg",
  "specializations.jpg",
  "statistics.jpg",
  "your_career.jpg",
];

export const cardsDescriptions = [
  {
    text: "Check your progress and what are you learning, before moving to next stage in your career!",
    productionStatus: false,
  },
  {
    text: "Create your cv: manually, importing existing one or create based on offer you found in web",
    productionStatus: true,
  },
  {
    text: "Get information and insights from offer you find by inserting link and we will compare how do you suits to offer ",
    productionStatus: true,
  },
  {
    text: "Usage statistics for each of our products",
    productionStatus: false,
  },

  {
    text: "If you like to discuss about your current work and next steps, check our chatbot!",
    productionStatus: false,
  },
];

export const dynamicUrls = ["/react_developer", "/ml_developer"];

export const icons = [
  <InsightsIcon key="InsightsIcon" />,
  <SaveAsIcon key="SaveAsIcon" />,
  <InboxIcon key="InboxIcon" />,
  <InsertChartIcon key="InsertChartIcon" />,
  <VoiceChatIcon key="VoiceChatIcon" />,
  <StackedBarChartIcon key="StackedBarChartIcon" />,
  <AutoGraphIcon key="AutoGraphIcon" />,
  <SwitchAccountSharpIcon key="SwitchAccountSharpIcon" />,
  <LocalOfferSharpIcon key="LocalOfferSharpIcon" />,
  <StarsSharpIcon key="StarsSharpIcon" />,
  <ManageAccountsSharpIcon key="ManageAccountsSharpIcon" />,
];

// export const screenSize = window.innerWidth;
// console.log(screenSize);

// export const drawerWidth = screenSize < 800 ? screenSize : screenSize / 5;
const drawerWidth = "30rem";

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//////////////// APP BAR ///////////////////

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  // height: "3rem",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
