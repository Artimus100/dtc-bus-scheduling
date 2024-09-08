// src/components/RealTimeUpdates.tsx
import React, { useEffect } from 'react';
import ws from '../websocket';

const RealTimeUpdates: React.FC = () => {
  useEffect(() => {
    ws.onmessage = (event) => {
      console.log('Real-time update:', event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return <div>Real-time updates will appear in the console</div>;
};

export default RealTimeUpdates;
