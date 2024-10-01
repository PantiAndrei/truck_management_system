// frontend/src/components/AddTruck.js

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

function AddTruck() {
  const [formData, setFormData] = useState({
    license_plate: '',
    make: '',
    model: '',
    year: '',
    capacity: '',
    status: 'available',    // Default value
    load_status: 'empty',   // Default value
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'capacity' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to match backend expectations
    const truckData = {
      ...formData,
      year: parseInt(formData.year),
      capacity: parseFloat(formData.capacity),
    };

    axiosInstance
      .post('/api/trucks/', truckData)
      .then(() => {
        setSuccessMessage('Truck added successfully!');
        setErrorMessage('');
        // Reset the form
        setFormData({
          license_plate: '',
          make: '',
          model: '',
          year: '',
          capacity: '',
          status: 'available',
          load_status: 'empty',
        });
      })
      .catch((error) => {
        console.error('Error adding truck:', error.response.data);
        setErrorMessage('Failed to add truck.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Truck
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="License Plate"
          name="license_plate"
          value={formData.license_plate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Make"
          name="make"
          value={formData.make}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Capacity"
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {/* Optional fields for status and load_status */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Truck
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

export default AddTruck;
