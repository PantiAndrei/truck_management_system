// frontend/src/components/MapView.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/trucks/')
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trucks:', error);
      });
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trucks.map((truck) =>
        truck.latitude && truck.longitude ? (
          <Marker key={truck.id} position={[truck.latitude, truck.longitude]}>
            <Popup>
              {truck.make} {truck.model} - {truck.license_plate}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}

export default MapView;
