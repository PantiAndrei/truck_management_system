// frontend/src/components/Trucks.js

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

function Trucks() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/trucks/')
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trucks:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/trucks/${id}/`)
      .then(() => {
        setTrucks(trucks.filter((truck) => truck.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting truck:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Trucks
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/trucks/add"
        style={{ marginBottom: '16px' }}
      >
        Add Truck
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Trucks Table">
          <TableHead>
            <TableRow>
              <TableCell>License Plate</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Load Status</TableCell>
              <TableCell>Assigned Driver</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trucks.map((truck) => (
              <TableRow key={truck.id}>
                <TableCell>{truck.license_plate}</TableCell>
                <TableCell>{truck.make}</TableCell>
                <TableCell>{truck.model}</TableCell>
                <TableCell>{truck.year}</TableCell>
                <TableCell>{truck.capacity}</TableCell>
                <TableCell>{truck.status}</TableCell>
                <TableCell>{truck.load_status}</TableCell>
                <TableCell>
                  {truck.assigned_driver
                    ? `${truck.assigned_driver.user.username}`
                    : 'None'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/trucks/edit/${truck.id}`}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(truck.id)}
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

export default Trucks;
