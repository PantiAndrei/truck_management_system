// frontend/src/components/EditDriver.js

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

function EditDriver() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    user: {
      username: '',
      first_name: '',
      last_name: '',
    },
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

  useEffect(() => {
    axiosInstance
      .get(`/api/drivers/${id}/`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching driver:', error);
        setErrorMessage('Failed to fetch driver data.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('user.')) {
      const userField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          [userField]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/api/drivers/${id}/`, formData)
      .then(() => {
        setSuccessMessage('Driver updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error updating driver:', error);
        setErrorMessage('Failed to update driver.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Driver
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="user.username"
          value={formData.user.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="First Name"
          name="user.first_name"
          value={formData.user.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="user.last_name"
          value={formData.user.last_name}
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
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Driver
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

export default EditDriver;
