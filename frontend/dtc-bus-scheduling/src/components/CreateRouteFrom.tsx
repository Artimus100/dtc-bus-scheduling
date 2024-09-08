// src/components/CreateRouteForm.tsx
import React, { useState } from 'react';

interface CreateRouteFormProps {
  onCreateRoute: (route: { id: string; name: string; path: string }) => void;
}

const CreateRouteForm: React.FC<CreateRouteFormProps> = ({ onCreateRoute }) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate route creation and response with id
      const newRoute = { id: 'unique-id', name, path };
      onCreateRoute(newRoute);
    } catch (error) {
      console.error('Error creating route:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Route Name"
      />
      <textarea
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="Route Path (GeoJSON)"
      />
      <button type="submit">Create Route</button>
    </form>
  );
};

export default CreateRouteForm;
