import React from "react";

import { makeStyles } from "@material-ui/core/styles";
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

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";


import { format } from "date-fns";


import dorje from "../images/toon.png";
import { purple } from "@mui/material/colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import './Layout.css'

const drawerWidth = 220;

// learn about passing object through makeStyles and passing note on UseStyles(note) to apply condition above like this video
//https://www.youtube.com/watch?v=6BkqRkw0Lwc&list=PL4cUxeGkcC9gjxLvV4VEkZ6H6H4yWuS58&index=16
const useStyles = makeStyles({
  activeMenu: {
    // background: '#f4f4f4'
    background: "green",
  },
});

export default function Layout({ children }) {
  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();

  const menuItems = [
    {
      text: "NOTEBOOK",
      icon: <MenuBookOutlinedIcon />,
      path: "/",
    },
    {
      text: "NEW NOTE",
      icon: <NoteAddOutlinedIcon />,
      path: "/create",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={3}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItem: "center" }}>
          <Typography variant="h6">
            <CalendarMonthIcon
              sx={{ fontSize: 30, marginRight: 1 }}
              />
              {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography variant="h5">
            <b>WELCOME TO THE NOTEBOOK!</b>
          </Typography>
          <Avatar
            alt="MikDorje"
            src={dorje}
            sx={{ outline: "1px solid white" }}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            borderRight: '1px solid grey',
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <>
                <ListItem
                  key={item.text}
                  button
                  onClick={() => history.push(item.path)}
                  // onClick={() => console.log(item.path)}
                  // sx={{backgroundColor: '#f4f4f4'}}

                  // className={location.pathname == item.path ? classes.activeMenu : null}
                  className= {location.pathname === item.path && "active"}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>{children}</div>
      </Box>
    </Box>
  );
}
