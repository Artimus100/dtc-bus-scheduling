import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Route {
  id: number;
  name: string;
  color: string;
  coordinates: [number, number][];
}

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 1,
      name: "Route 1",
      color: "blue",
      coordinates: [
        [28.6139, 77.2090],
        [28.6229, 77.2100],
        [28.6339, 77.2200]
      ]
    },
    {
      id: 2,
      name: "Route 2",
      color: "red",
      coordinates: [
        [28.6500, 77.2300],
        [28.6600, 77.2400],
        [28.6700, 77.2500]
      ]
    }
  ]);

  const [newRoute, setNewRoute] = useState({
    name: '',
    startLat: '',
    startLng: '',
    endLat: '',
    endLng: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoute(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRouteObject: Route = {
      id: routes.length + 1,
      name: newRoute.name,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
      coordinates: [
        [parseFloat(newRoute.startLat), parseFloat(newRoute.startLng)],
        [parseFloat(newRoute.endLat), parseFloat(newRoute.endLng)]
      ]
    };
    setRoutes([...routes, newRouteObject]);
    setNewRoute({ name: '', startLat: '', startLng: '', endLat: '', endLng: '' });
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log('Map clicked at:', e.latlng);
        // You can use this to implement click-to-add-point functionality
      },
    });
    return null;
  };

  return (
    <div className="route-management">
      <h2>Route Management</h2>
      
      <MapContainer 
        center={[28.6139, 77.2090]} 
        zoom={11} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {routes.map((route) => (
          <Polyline 
            key={route.id} 
            positions={route.coordinates} 
            color={route.color} 
          />
        ))}
        <MapEvents />
      </MapContainer>

      <div className="new-route-form">
        <h3>Add New Route</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newRoute.name}
            onChange={handleInputChange}
            placeholder="Route Name"
            required
          />
          <input
            type="number"
            name="startLat"
            value={newRoute.startLat}
            onChange={handleInputChange}
            placeholder="Start Latitude"
            required
          />
          <input
            type="number"
            name="startLng"
            value={newRoute.startLng}
            onChange={handleInputChange}
            placeholder="Start Longitude"
            required
          />
          <input
            type="number"
            name="endLat"
            value={newRoute.endLat}
            onChange={handleInputChange}
            placeholder="End Latitude"
            required
          />
          <input
            type="number"
            name="endLng"
            value={newRoute.endLng}
            onChange={handleInputChange}
            placeholder="End Longitude"
            required
          />
          <button type="submit">Add Route</button>
        </form>
      </div>
    </div>
  );
};

export default RouteManagement;