import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { List, CssBaseline, Typography } from "@mui/material/";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import {
  drawerTabs,
  pagesUrls,
  DrawerHeader,
  Drawer,
  dynamicUrls,
  icons,
} from "../util/helpers";
import Main from "./Main";

export default function MiniDrawer({ children }) {
  const drawerWidth = 240;
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);

  const handleCollapse = function () {
    setCollapse((prevState) => !prevState);
    setOpen((prevState) => {
      return prevState ? prevState : !prevState;
    });
  };

  const handleDrawerOpen = () => {
    setOpen((prevState) => {
      return !prevState;
    });
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleSelectItem = function (index: number) {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <br />
        <List>
          {drawerTabs.map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", color: "white" }}
            >
              <ListItemButton
                href={pagesUrls[index]}
                selected={selectedIndex === index}
                onClick={() => handleSelectItem(index)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItemButton onClick={handleCollapse}>
            <ListItemIcon>
              <StarsSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Specializations" sx={{ color: "white" }} />
            {collapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <List component="div" key="specialization_list" disablePadding>
              {["React Developer", "ML Developer"].map(
                (specialization, index) => {
                  return (
                    <ListItemButton
                      key={specialization + index}
                      href={dynamicUrls[index]}
                      selected={selectedIndex === index + 5}
                      onClick={() => handleSelectItem(index + 5)}
                      sx={{ pl: 4, color: "white" }}
                    >
                      <ListItemIcon key={specialization + 5}>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={specialization} />
                    </ListItemButton>
                  );
                }
              )}
            </List>
          </Collapse>
        </List>
      </Drawer>
      {/* <Main open={open} /> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ...(open && { display: { xs: "none", md: "block" } }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
