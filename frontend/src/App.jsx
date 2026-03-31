import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import Login from './pages/Login';
import MyTrips from './pages/MyTrips';
import PNRStatus from './pages/PNRStatus';
import Services from './pages/Services';
import Support from './pages/Support';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mytrips" element={<MyTrips />} />
          <Route path="/pnrstatus" element={<PNRStatus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
