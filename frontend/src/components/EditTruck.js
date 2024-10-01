// frontend/src/components/EditTruck.js

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

function EditTruck() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    license_plate: '',
    make: '',
    model: '',
    year: '',
    capacity: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/trucks/${id}/`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching truck:', error);
        setErrorMessage('Failed to fetch truck data.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/api/trucks/${id}/`, formData)
      .then(() => {
        setSuccessMessage('Truck updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error updating truck:', error);
        setErrorMessage('Failed to update truck.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Truck
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Truck
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

export default EditTruck;
