// src/components/Map.tsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Example of adding a route
    const route = L.polyline([[51.5, -0.09], [51.51, -0.1]], { color: 'blue' }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '500px' }} />;
};

export default Map;
