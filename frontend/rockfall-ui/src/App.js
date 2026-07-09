import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import Alerts from './pages/Alerts';
import Predict from './pages/Predict';
import Register from './pages/Register';

function App() {

  useEffect(() => {
    // Ping backend every 14 minutes to keep it awake
    const pingBackend = () => {
      fetch('https://rockfall-backend-0mqf.onrender.com/api/sensors')
        .then(() => console.log('Backend pinged successfully'))
        .catch(() => console.log('Ping failed'));
    };

    // Ping immediately when app loads
    pingBackend();

    // Ping every 14 minutes (840000 milliseconds)
    const interval = setInterval(pingBackend, 840000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;