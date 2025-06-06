import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HotelDetails from './pages/HotelDetails';
import AddHotel from './pages/AddHotel';
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/add-hotel" element={<AddHotel />} />
      </Routes>

    </Router>
  );
}

export default App;

// hotel --> repo name