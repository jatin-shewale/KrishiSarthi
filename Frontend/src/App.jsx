import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import EquipmentDetails from './pages/EquipmentDetails';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import AddEquipment from './pages/AddEquipment';
import FarmerDashboard from './pages/FarmerDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import WeatherDashboard from './pages/WeatherDashboard';
import AIAssistant from './pages/AIAssistant';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/equipment/:id" element={<ProtectedRoute><EquipmentDetails /></ProtectedRoute>} />
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/add-equipment" element={<ProtectedRoute><AddEquipment /></ProtectedRoute>} />
          <Route path="/dashboard/farmer" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weather" element={<ProtectedRoute><WeatherDashboard /></ProtectedRoute>} />
          <Route path="/ai" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
