import React from "react";
import { Toolbar, AppBar, Box, IconButton, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";


// Here, we display our Navbar
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Habitual
          </Typography>
          <Button color="inherit" component={Link} to="/create">Create Habit</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}