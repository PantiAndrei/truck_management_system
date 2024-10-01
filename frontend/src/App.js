// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import axiosInstance from './axiosInstance';
import Login from './components/Login';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Trucks from './components/Trucks';
import AddTruck from './components/AddTruck';
import EditTruck from './components/EditTruck';
import Drivers from './components/Drivers';
import AddDriver from './components/AddDriver';
import EditDriver from './components/EditDriver';
import Clients from './components/Clients';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';
import Orders from './components/Orders';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';



function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers['Authorization'];
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axiosInstance.defaults.headers['Authorization'];
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <NavBar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/trucks" element={<Trucks />} />
        <Route path="/trucks/add" element={<AddTruck />} />
        <Route path="/trucks/edit/:id" element={<EditTruck />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/add" element={<AddDriver />} />
        <Route path="/drivers/edit/:id" element={<EditDriver />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/clients/edit/:id" element={<EditClient />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/add" element={<AddOrder />} />
        <Route path="/orders/edit/:id" element={<EditOrder />} />
        <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
