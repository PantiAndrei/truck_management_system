// frontend/src/components/AddOrder.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
} from '@mui/material';

function AddOrder() {
  const [formData, setFormData] = useState({
    client: '',
    delivery_date: '',
    pickup_location: '',
    delivery_location: '',
    goods_description: '',
    status: '',
    assigned_truck: '',
    assigned_driver: '',
  });

  const [clients, setClients] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  useEffect(() => {
    // Fetch clients
    axiosInstance
      .get('/api/clients/')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error.response.data);
      });

    // Fetch trucks
    axiosInstance
      .get('/api/trucks/')
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trucks:', error.response.data);
      });

    // Fetch drivers
    axiosInstance
      .get('/api/drivers/')
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching drivers:', error.response.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value || null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      client: formData.client,
      delivery_date: formData.delivery_date,
      pickup_location: formData.pickup_location,
      delivery_location: formData.delivery_location,
      goods_description: formData.goods_description,
      status: formData.status,
      assigned_truck: formData.assigned_truck || null,
      assigned_driver: formData.assigned_driver || null,
    };

    axiosInstance
      .post('/api/orders/', orderData)
      .then(() => {
        setSuccessMessage('Order added successfully!');
        setErrorMessage('');
        // Reset the form
        setFormData({
          client: '',
          delivery_date: '',
          pickup_location: '',
          delivery_location: '',
          goods_description: '',
          status: '',
          assigned_truck: '',
          assigned_driver: '',
        });
      })
      .catch((error) => {
        console.error('Error adding order:', error.response.data);
        setErrorMessage('Failed to add order.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Client"
          name="client"
          value={formData.client}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Delivery Date"
          name="delivery_date"
          type="date"
          value={formData.delivery_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="Pickup Location"
          name="pickup_location"
          value={formData.pickup_location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Delivery Location"
          name="delivery_location"
          value={formData.delivery_location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Goods Description"
          name="goods_description"
          value={formData.goods_description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
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
          select
          label="Assigned Truck"
          name="assigned_truck"
          value={formData.assigned_truck}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">None</MenuItem>
          {trucks.map((truck) => (
            <MenuItem key={truck.id} value={truck.id}>
              {truck.license_plate}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Assigned Driver"
          name="assigned_driver"
          value={formData.assigned_driver}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">None</MenuItem>
          {drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.id}>
              {driver.user.username}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Order
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

export default AddOrder;
