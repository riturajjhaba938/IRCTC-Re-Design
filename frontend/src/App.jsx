import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import PageTransition from './components/PageTransition';
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyTrips from './pages/MyTrips';
import PNRStatus from './pages/PNRStatus';
import Services from './pages/Services';
import Support from './pages/Support';
import Meals from './pages/Meals';
import EWallet from './pages/EWallet';
import Alerts from './pages/Alerts';

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/pnrstatus" element={<PNRStatus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/support" element={<Support />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/ewallet" element={<EWallet />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-surface text-on-surface">
            <AppRoutes />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
