import { makeStyles, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { Link, useLocation } from "react-router-dom";
import { Home, Apps as AppsIcon, PeopleAlt as PeopleAltIcon, EventSeat as EventSeatIcon } from "@material-ui/icons";
import { TopBar } from "./components/TopBar";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
  },
  topBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
  },
  container: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flex: "1 1 auto",
    overflowY: "auto",
  },
  listItem: {
    transition: "background-color 0.3s, box-shadow 0.3s",
    color: "black",
  },
  activeListItem: {
    backgroundColor: "rgb(113, 47, 145)",
    color: "white",
  },
  listItemHover: {
    "&:hover": {
      backgroundColor: "rgb(170, 187, 17)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  },
}));

function Dashboard(props) {
  const { route, isAuthenticated } = props;
  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setOpenNavBarMobile(!openNavBarMobile);
  };

  const handleMenuCloseClick = () => {
    setOpenNavBarMobile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
    // Additional logout logic if needed
  };

  const sidebarLinks = [
    { to: "/", text: "Home", icon: <Home /> },
    { to: "/userprofile", text: "Profile", icon: <AssignmentIndIcon /> },
    { to: "/admin/usermanagement", text: "Admin UserMangement", icon: <PeopleAltIcon /> },
    { to: "/userbookhistory", text: "Book Your Seat", icon: <EventSeatIcon /> },
    { to: "/auth/login", text: "Logout", icon: <ExitToAppIcon />, onClick: handleLogout },
  ];

  return (
    <div className={classes.root}>
      <TopBar className={classes.topBar} openMenu={handleMenuClick} />
      <nav className={classes.drawer}>
        <Hidden lgUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={openNavBarMobile}
            onClose={handleMenuCloseClick}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <List>
              {sidebarLinks.map((link, index) => (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={link.to}
                  className={`${classes.listItem} ${classes.listItemHover} ${location.pathname === link.to && classes.activeListItem
                    }`}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.container}>
        <main className={classes.content}>
          {renderRoutes(route.routes, { isAuthenticated })}
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(Dashboard);
