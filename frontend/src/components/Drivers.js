// frontend/src/components/Drivers.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
} from '@mui/material';

function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/drivers/')
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching drivers:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/drivers/${id}/`)
      .then(() => {
        setDrivers(drivers.filter((driver) => driver.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting driver:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Drivers
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/drivers/add"
        style={{ marginBottom: '16px' }}
      >
        Add Driver
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Drivers Table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>License Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Certifications</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.user.username}</TableCell>
                <TableCell>
                  {driver.user.first_name} {driver.user.last_name}
                </TableCell>
                <TableCell>{driver.license_number}</TableCell>
                <TableCell>{driver.status}</TableCell>
                <TableCell>{driver.certifications}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/drivers/edit/${driver.id}`}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(driver.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Drivers;
