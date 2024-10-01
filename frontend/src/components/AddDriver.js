// frontend/src/components/AddDriver.js

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

function AddDriver() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    license_number: '',
    status: '',
    certifications: '',
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

    const driverData = {
      user: {
        username: formData.username,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      },
      license_number: formData.license_number,
      status: formData.status,
      certifications: formData.certifications,
    };

    axiosInstance
      .post('/api/drivers/', driverData)
      .then(() => {
        setSuccessMessage('Driver added successfully!');
        setErrorMessage('');
        // Reset the form
        setFormData({
          username: '',
          password: '',
          first_name: '',
          last_name: '',
          license_number: '',
          status: '',
          certifications: '',
        });
      })
      .catch((error) => {
        console.error('Error adding driver:', error.response.data);
        setErrorMessage('Failed to add driver.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Driver
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="License Number"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Certifications"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Driver
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

export default AddDriver;
