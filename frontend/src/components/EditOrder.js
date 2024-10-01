// frontend/src/components/EditOrder.js

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
  MenuItem,
} from '@mui/material';

function EditOrder() {
  const { id } = useParams();
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
    // Fetch order data
    axiosInstance
      .get(`/api/orders/${id}/`)
      .then((response) => {
        const data = response.data;
        setFormData({
          client: data.client.id,
          delivery_date: data.delivery_date,
          pickup_location: data.pickup_location,
          delivery_location: data.delivery_location,
          goods_description: data.goods_description,
          status: data.status,
          assigned_truck: data.assigned_truck ? data.assigned_truck.id : '',
          assigned_driver: data.assigned_driver ? data.assigned_driver.id : '',
        });
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
        setErrorMessage('Failed to fetch order data.');
      });

    // Fetch clients
    axiosInstance
      .get('/api/clients/')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });

    // Fetch trucks
    axiosInstance
      .get('/api/trucks/')
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trucks:', error);
      });

    // Fetch drivers
    axiosInstance
      .get('/api/drivers/')
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching drivers:', error);
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
      .put(`/api/orders/${id}/`, formData)
      .then(() => {
        setSuccessMessage('Order updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        setErrorMessage('Failed to update order.');
        setSuccessMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Order
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
          Update Order
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

export default EditOrder;
