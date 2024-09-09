import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Route {
  name: string;
  startPoint: string;
  endPoint: string;
  intermediateStops: string;
  coordinates: [number, number][];
  color: string;
}

interface MapProps {
  routes: Route[];
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ routes, center, zoom }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      const bounds = L.latLngBounds([]);

      routes.forEach((route) => {
        const polyline = L.polyline(route.coordinates, { color: route.color }).addTo(mapRef.current!);
        
        // Add markers for start and end points
        const startPoint = route.coordinates[0];
        const endPoint = route.coordinates[route.coordinates.length - 1];
        
        L.marker(startPoint).addTo(mapRef.current!).bindPopup(`Start: ${route.startPoint}`);
        L.marker(endPoint).addTo(mapRef.current!).bindPopup(`End: ${route.endPoint}`);
        
        bounds.extend(polyline.getBounds());
      });

      mapRef.current.fitBounds(bounds);
    }
  }, [routes]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default Map;