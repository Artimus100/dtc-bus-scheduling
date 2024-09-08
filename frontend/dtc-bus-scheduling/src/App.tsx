import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './components/Map';
import CustomButton from './components/CustomButton';
import Chart from './components/Chart';
import RealTimeUpdates from './components/RealTimeUpdates';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>DTC Bus Scheduling</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div className="main-content">
              <div className="map-container">
                <Map routes={[]} /> {/* You can update this to show routes based on your requirement */}
              </div>
              <div className="chart-container">
                <Chart />
              </div>
              <div className="button-container">
                <CustomButton onClick={handleButtonClick} />
              </div>
              <div className="realtime-updates-container">
                <RealTimeUpdates />
              </div>
            </div>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
