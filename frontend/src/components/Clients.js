// frontend/src/components/Clients.js

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

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/clients/')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/clients/${id}/`)
      .then(() => {
        setClients(clients.filter((client) => client.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting client:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/clients/add"
        style={{ marginBottom: '16px' }}
      >
        Add Client
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Clients Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Information</TableCell>
              <TableCell>Billing Details</TableCell>
              <TableCell>Contract Terms</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.contact_information}</TableCell>
                <TableCell>{client.billing_details}</TableCell>
                <TableCell>{client.contract_terms}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/clients/edit/${client.id}`}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(client.id)}
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

export default Clients;
