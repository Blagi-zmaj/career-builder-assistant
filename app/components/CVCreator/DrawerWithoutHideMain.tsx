import * as React from "react";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import * as React from "react";
// import { Box } from "@mui/material";
// import { Toolbar } from "@mui/material/";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Collapse } from "@mui/material";
import CustomBreadcrumbs from "../Breadcrumbs";
import { usePathname } from "next/navigation";

import {
  AppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../util/helpers";

import {
  drawerTabs,
  pagesUrls,
  DrawerHeader,
  // Drawer,
  dynamicUrls,
  icons,
} from "../../util/helpers";
import Navigation from "../Navigation";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
const drawerWidth = 300;

export default function ResponsiveDrawer({ children }) {
  //   const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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
            <ListItemButton
              href={pagesUrls[index]}
              selected={selectedIndex === index}
              onClick={() => handleSelectItem(index)}
              sx={{
                minHeight: 48,
                justifyContent: mobileOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: mobileOpen ? 3 : "auto",
                  justifyContent: "center",
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
              ) : null}
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItemButton onClick={handleCollapse}>
          <ListItemIcon>
            <StarsSharpIcon />
          </ListItemIcon>
          <ListItemText
            primary={mobileOpen ? "Specialization" : ""}
            sx={{ color: "white" }}
          />
          {/* {collapse ? <ExpandLess /> : <ExpandMore />} */}
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

      {/* ////////////////////////////////////////////// */}

      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation handleDrawerOpen={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: "5rem" } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
              width: mobileOpen ? drawerWidth : "5rem",
            },
          }}
          open={mobileOpen}
        >
          {drawer}
        </Drawer>
      </Box>
      <div
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          //   ...(open && { display: { xs: "none", md: "block" } }),
        }}
      >
        {children}
      </div>
    </Box>
  );
}
