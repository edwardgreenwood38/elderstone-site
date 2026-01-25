import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import your new component
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BlankStatic from './pages/BlankStatic';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tier, setTier] = useState('Starter'); // change to plan title

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = 'var(--bg-card)';
    document.body.style.color = 'var(--text-main)';
  }, [darkMode]);

  return (
    <Router>
      {/* The 'min-vh-100' class ensures the app takes the full screen height.
          The 'd-flex flex-column' allows the main content to push the footer down.
      */}
      <div className="d-flex flex-column min-vh-100">
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* 'flex-grow-1' makes this section expand to fill all available space,
            effectively pushing the footer to the bottom.
        */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home tier={tier} setTier={setTier} darkMode={darkMode} />} />
            <Route path="/about" element={<About tier={tier} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/services" element={<Services tier={tier} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/contact" element={<Contact tier={tier} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/billing" element={<BlankStatic tier={tier} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/privacy" element={<PrivacyPolicy tier={tier} darkMode={darkMode} setDarkMode={setDarkMode}/>} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;