import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HUDLayout from './components/HUDLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Showcase from './pages/Showcase';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <HUDLayout>
        <Routes>
          {/* Default base redirects to the tactical Home dashboard */}
          <Route path="/" element={<Navigate to="/Home.asp" replace />} />
          
          {/* Custom ASP-Mapped Page Router Nodes */}
          <Route path="/Home.asp" element={<Home />} />
          <Route path="/Projects.asp" element={<Projects />} />
          <Route path="/Showcase.asp" element={<Showcase />} />
          <Route path="/About.asp" element={<About />} />
          <Route path="/Contact.asp" element={<Contact />} />
          
          {/* Catch-all redirects back to secure Home terminal */}
          <Route path="*" element={<Navigate to="/Home.asp" replace />} />
        </Routes>
      </HUDLayout>
    </Router>
  );
}
