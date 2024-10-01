// frontend/src/components/EditClient.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

function EditClient() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    contact_information: '',
    billing_details: '',
    contract_terms: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/clients/${id}/`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching client:', error);
        setErrorMessage('Failed to fetch client data.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/api/clients/${id}/`, formData)
      .then(() => {
        setSuccessMessage('Client updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error updating client:', error);
        setErrorMessage('Failed to update client.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Client
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact Information"
          name="contact_information"
          value={formData.contact_information}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          required
        />
        <TextField
          label="Billing Details"
          name="billing_details"
          value={formData.billing_details}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
        />
        <TextField
          label="Contract Terms"
          name="contract_terms"
          value={formData.contract_terms}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Client
        </Button>
      </form>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditClient;
