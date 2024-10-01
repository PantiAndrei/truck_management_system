// frontend/src/components/Dashboard.js

import React from 'react';
import { Typography, Container } from '@mui/material';
import MapView from './MapView';

function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <MapView />
    </Container>
  );
}

export default Dashboard;
