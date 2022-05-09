import React from "react";
import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";


import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCardIcon from '@mui/icons-material/AddCard';


import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";

import { format } from "date-fns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "./Layout.css";
import { signOut } from "firebase/auth";

import { auth } from "../FirebaseAuth";
import { onAuthStateChanged } from "firebase/auth";


const drawerWidth = 200;

export default function Layout({ children }) {
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "NOTEBOOK",
      icon: <LibraryBooksIcon sx={{ color: "#348586", fontSize: 30 }} />,
      path: "/notebook",
    },
    {
      text: "NEW NOTE",
      icon: <AddBoxIcon sx={{ color: "#348586", fontSize: 30 }} />,
      path: "/create",
    },
  ];

  const [user, setUser] = React.useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = async () => {
    await signOut(auth);
    history.push("/");
  };

  const dname = user?.email?.split("@")[0];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        className="appbar"
        position="fixed"
        elevation={3}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItem: "center" }}>
          <Typography variant="h6">
            <CalendarMonthIcon sx={{ fontSize: 30, marginRight: 1 }} />
            {format(new Date(), "do MMMM Y")}
          </Typography>

          <Typography variant="h5">
            <b>WELCOME TO THE NOTEBOOK!</b>
          </Typography>

          <Avatar sx={{ bgcolor: "white" }}>
            <Typography sx={{ color: "#348586", fontSize: 28 }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        className="main-drawer"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            borderRight: "1px solid grey",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box component="main" className="drawer-box">
          <List>
            {menuItems.map((item) => (
              <>
                <ListItem
                  sx={{
                    minHeight: "50px",
                    color: "#666666",
                    fontFamily: "Quicksand",
                    fontWeight: "600",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                  key={item.text}
                  button
                  onClick={() => history.push(item.path)}
                  // className={location.pathname == item.path ? classes.activeMenu : null}
                  className={location.pathname === item.path && "active"}
                >
                  {item.icon}
                  {item.text}
                </ListItem>

                <Divider />
              </>
            ))}
          </List>

          <Divider />

          <div className="logout-box">
            <div className="avatar-name">
              <Avatar sx={{ bgcolor: "#348586", m: "2px" }}></Avatar>

              {`${dname?.charAt(0).toUpperCase()}${dname?.slice(1)}`}
            </div>

            <button className="bigbutton" type="text" onClick={handleLogout}>
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 512 512"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M421.24,269.93h30V429.84a48.72,48.72,0,0,1-48.66,48.66H82.77a48.72,48.72,0,0,1-48.66-48.66V110A48.72,48.72,0,0,1,82.77,61.37H242.68v30H82.77A18.68,18.68,0,0,0,64.11,110V429.84A18.68,18.68,0,0,0,82.77,448.5H402.58a18.68,18.68,0,0,0,18.66-18.66Zm-69-236.43v30h74.4L249.5,240.68l21.21,21.21L447.89,84.71v74.4h30V33.5Z"
                    />
                  </svg>
                </div>
              </div>
              <span>
                <strong>Logout</strong>
              </span>
            </button>
          </div>
        </Box>
      </Drawer>

      <Box component="main" className="children" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div>{children}</div>
      </Box>
    </Box>
  );
}
