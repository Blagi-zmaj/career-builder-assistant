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
  // imagesSrc,
  pagesUrls,
  // cardsDescriptions,
  DrawerHeader,
  Drawer,
  dynamicUrls,
  icons,
} from "../util/helpers";
import Main from "./Main";

export default function MiniDrawer() {
  const pathname = usePathname();
  console.log(`MINIDRAWER` + pathname);
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
                    <>
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
                    </>
                  );
                }
              )}
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Main open={open} />
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ...(open && { display: { xs: "none", md: "block" } }),
        }}
      >
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
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
      </Box> */}
    </Box>
  );
}
