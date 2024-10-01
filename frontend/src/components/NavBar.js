// frontend/src/components/NavBar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NavBar({ handleLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Truck Management System
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={RouterLink} to="/notifications">
          Notifications
        </Button>
        <Button color="inherit" component={RouterLink} to="/trucks">
          Trucks
        </Button>
        <Button color="inherit" component={RouterLink} to="/drivers">
          Drivers
        </Button>
        <Button color="inherit" component={RouterLink} to="/clients">
          Clients
        </Button>
        <Button color="inherit" component={RouterLink} to="/orders">
          Orders
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
