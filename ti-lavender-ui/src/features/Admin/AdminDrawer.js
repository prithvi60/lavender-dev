import React from "react";
import {
  Toolbar,
  IconButton,
  Divider,
  List,
  SwipeableDrawer,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import AdminDrawerItem from "./AdminDrawerItem";

export const AdminDrawer = ({ open, toggleDrawer }) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      // disableBackdropTransition={true}
      classes={{
        paper: "admin-drawer",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <AdminDrawerItem collapse={open} />
      </List>
    </SwipeableDrawer>
  );
};

export default AdminDrawer;
