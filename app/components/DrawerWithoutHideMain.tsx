import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Collapse, Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";
import { drawerTabs, pagesUrls, dynamicUrls, icons } from "../util/helpers";
import Navigation from "./Navigation";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import { useContext } from "react";
import { NavAndDrawerContext } from "@/app/util/context";

const drawerWidth = 300;

export default function ResponsiveDrawer({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  // const [showTooltip, setShowTooltip] = React.useState(true);
  const { showNavAndDrawer, toggleShowNavAndDrawer } =
    useContext(NavAndDrawerContext);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

  const handleSelectItem = function (index: number) {
    setSelectedIndex(index);
  };

  const [collapse, setCollapse] = React.useState(false);

  const handleCollapse = function () {
    setCollapse((prevState) => !prevState);
    setOpen((prevState) => {
      return prevState ? prevState : !prevState;
    });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerTabs.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ display: "block", color: "white" }}
          >
            {/* <Tooltip title={text} open={showTooltip}> */}
            <ListItemButton
              href={pagesUrls[index]}
              selected={selectedIndex === index}
              onClick={() => handleSelectItem(index)}
              sx={{
                minHeight: 48,
                justifyContent: mobileOpen ? "initial" : "center",
                px: 2.5,
                display: "flex",
                flexDirection: mobileOpen ? "row" : "column",
                alignItems: mobileOpen ? "end" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: mobileOpen ? 2 : 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {icons[index]}
              </ListItemIcon>
              {mobileOpen ? (
                <ListItemText
                  primary={mobileOpen ? text : ""}
                  sx={{
                    opacity: mobileOpen ? 1 : 0,
                  }}
                />
              ) : (
                // null
                <span
                  style={{
                    fontSize: "0.75rem",
                    textAlign: "center",
                    marginTop: "0.25rem",
                  }}
                >
                  {text}
                </span>
              )}
            </ListItemButton>
            {/* </Tooltip> */}
          </ListItem>
        ))}
        <Divider />
        <ListItemButton
          onClick={handleCollapse}
          // sx={{
          //   color: "white",
          //   display: mobileOpen ? "flex" : "block",
          //   flexDirection: mobileOpen ? "column" : "row",
          //   alignItems: mobileOpen ? "center" : "start",
          // }}

          sx={{
            minHeight: 48,
            justifyContent: mobileOpen ? "initial" : "center",
            px: 2.5,
            display: "flex",
            flexDirection: mobileOpen ? "row" : "column",
            alignItems: mobileOpen ? "end" : "center",
          }}
        >
          <ListItemIcon>
            <StarsSharpIcon sx={{ margin: mobileOpen ? "" : "0 auto" }} />
          </ListItemIcon>
          {/* <ListItemText
            primary={mobileOpen ? "Specialization" : "Specialization"}
            sx={{
              color: "white",
              // display: "flex",
              // flexDirection: "column",
              // minHeight: 148,
              // justifyContent: mobileOpen ? "initial" : "center",
              // // px: 2.5,
              // flexDirection: mobileOpen ? "row" : "column",
              // alignItems: mobileOpen ? "end" : "center",
            }}
          /> */}
          <span
            style={{
              fontSize: mobileOpen ? "1.25rem" : "0.75rem",
              textAlign: mobileOpen ? "center" : "left",
              marginTop: "0.25rem",
            }}
          >
            Specialization
          </span>
          {mobileOpen ? collapse ? <ExpandLess /> : <ExpandMore /> : null}
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
                    sx={{
                      // pl: 4,
                      color: "white",
                      minHeight: 48,
                      justifyContent: mobileOpen ? "initial" : "center",
                      px: 2.5,
                      display: "flex",
                      flexDirection: mobileOpen ? "row" : "column",
                      alignItems: mobileOpen ? "end" : "center",
                    }}
                  >
                    <ListItemIcon key={specialization + 5}>
                      <StarBorder sx={{ margin: mobileOpen ? "" : "0 auto" }} />
                    </ListItemIcon>
                    <span
                      style={{
                        fontSize: mobileOpen ? "1.25rem" : "0.75rem",
                        textAlign: mobileOpen ? "center" : "center",
                      }}
                    >
                      {specialization}
                    </span>
                  </ListItemButton>
                );
              }
            )}
          </List>
        </Collapse>
      </List>
    </div>
  );

  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation handleDrawerOpen={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{
          width: { sm: "5rem" },
          visibility: showNavAndDrawer === true ? "hidden" : "visible",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: mobileOpen ? drawerWidth : "6rem",
            },
          }}
          open={mobileOpen}
        >
          {drawer}
        </Drawer>

        {/* <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "flex" },
            // flexDirection: "column",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width: mobileOpen ? drawerWidth : "5rem",
              width: mobileOpen ? "5rem" : "10rem",
            },
          }}
          open={mobileOpen}
        >
          {drawer}
        </Drawer> */}
      </Box>
      <div
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </div>
    </Box>
  );
}
