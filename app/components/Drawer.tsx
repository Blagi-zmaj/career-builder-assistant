import * as React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  alpha,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import MultiActionAreaCard from "./Cards";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomBreadcrumbs from "./Breadcrumbs";
/////////////////// ICONS ///////////////////////
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import InsightsIcon from "@mui/icons-material/Insights";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import SwitchAccountSharpIcon from "@mui/icons-material/SwitchAccountSharp";
import LocalOfferSharpIcon from "@mui/icons-material/LocalOfferSharp";
import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import { usePathname } from "next/navigation";

const pagesUrls: string[] = [
  "/your_career",
  "/cv_creator",
  "/offer_scraping",
  "/statistics",
  "/career_advisor",
];

const drawerTabs: string[] = [
  "Your career",
  "CV Creator",
  "Get data from offer",
  "Statistics",
  "Career advisor",
];

const imagesSrc: string[] = [
  "career_advisor.jpg",
  "cv_creator.jpg",
  "offer_scraping.jpg",
  "specializations.jpg",
  "statistics.jpg",
  "your_career.jpg",
];

const cardsDescriptions: string[] = [
  "Check your progress and what are you learning, before moving to next stage in your career!",
  "Create your cv: manually, importing existing one or create based on offer you found in web",
  "Get insights from offer you find. Wrote link and we will generate informations and insights, and compare how do you suits to offer",
  "Usage statistics for each of our products",
  "If you like to discuss about your current work and next steps, check our chatbot!",
];

const dynamicUrls = ["/react_developer", "/ml_developer"];

const icons = [
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

// const screenSize = window.screen.width;
const screenSize = window.innerWidth;
console.log(screenSize);

const drawerWidth = screenSize < 800 ? screenSize : screenSize / 5;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const DrawerHeader = styled("div")(({ theme }) => ({
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    marginLeft: 0,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  //   width: open ? 400 : 300,
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

////////////// APP BAR END ////////////////////////

export default function MiniDrawer() {
  const pathname = usePathname();
  console.log(pathname);
  //////////// DRAWER STATE ////////////////////////
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);

  const handleCollapse = function () {
    setCollapse((prevState) => !prevState);
    setOpen((prevState) => {
      return !prevState;
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

  //////////// APP BAR STATE ////////////

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleSelectItem = function (index: number) {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <CustomBreadcrumbs pathName={pathname} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={12} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
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
        <List>
          {drawerTabs.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
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
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItemButton onClick={handleCollapse}>
            <ListItemIcon>
              <StarsSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Specializations" />
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
                        sx={{ pl: 4 }}
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
      <Box
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
      </Box>
    </Box>
  );
}
