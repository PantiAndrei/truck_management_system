// frontend/src/components/Login.js

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { TextField, Button, Typography, Container } from '@mui/material';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/api/token/', { username, password })
      .then((response) => {
        setToken(response.data.access);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setError('Invalid username or password');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
