import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrencyList from './components/CurrencyList';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar /> {/* Dodaj nawigację */}
      <Routes>
        <Route path="/" element={<CurrencyList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
