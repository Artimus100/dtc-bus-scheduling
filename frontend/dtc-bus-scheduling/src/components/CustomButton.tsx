// src/components/CustomButton.tsx
import React from 'react';
import Button from '@mui/material/Button';

const CustomButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Button variant="contained" color="primary" onClick={onClick}>Click Me</Button>;
};

export default CustomButton;
