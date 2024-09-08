// src/components/FetchRoutes.tsx
import React, { useEffect } from 'react';
import axios from '../api/axios';

const FetchRoutes: React.FC = () => {
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('/routes');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return <div>Check the console for fetched routes</div>;
};

export default FetchRoutes;
