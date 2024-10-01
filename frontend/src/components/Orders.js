// frontend/src/components/Orders.js

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

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/orders/')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/orders/${id}/`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/orders/add"
        style={{ marginBottom: '16px' }}
      >
        Add Order
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Orders Table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Delivery Location</TableCell>
              <TableCell>Goods Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Truck</TableCell>
              <TableCell>Assigned Driver</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.client.name}</TableCell>
                <TableCell>{order.delivery_date}</TableCell>
                <TableCell>{order.pickup_location}</TableCell>
                <TableCell>{order.delivery_location}</TableCell>
                <TableCell>{order.goods_description}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.assigned_truck
                    ? order.assigned_truck.license_plate
                    : 'None'}
                </TableCell>
                <TableCell>
                  {order.assigned_driver
                    ? order.assigned_driver.user.username
                    : 'None'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to={`/orders/edit/${order.id}`}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(order.id)}
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

export default Orders;
