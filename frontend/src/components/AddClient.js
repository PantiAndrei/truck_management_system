// frontend/src/components/AddClient.js

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

function AddClient() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/api/clients/', formData)
      .then(() => {
        setSuccessMessage('Client added successfully!');
        setErrorMessage('');
        // Optionally, reset the form
        setFormData({
          name: '',
          contact_information: '',
          billing_details: '',
          contract_terms: '',
        });
      })
      .catch((error) => {
        console.error('Error adding client:', error);
        setErrorMessage('Failed to add client.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Client
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
          Add Client
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

export default AddClient;
