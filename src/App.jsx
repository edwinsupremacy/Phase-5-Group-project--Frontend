import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import SellerLogin from './components/SellerLogin';
import SellerDashboard from './components/SellerDashboard';
import About from './components/About';
import Contact from './components/Contact';
import AuctionItems from './components/AuctionItems';
import Navbar from './components/Navbar';
import { ItemsProvider } from './components/ItemsContext'; // Import ItemsProvider

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  return (
    <ItemsProvider> {/* Wrap your app with ItemsProvider */}
      <div className="App">
        {isAuthenticated && location.pathname !== '/seller-dashboard' && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/auction-items" element={<AuctionItems />} />
            <Route path="/contact" element={<Contact />} />

            {/* Private Routes */}
            {isAuthenticated && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
              </>
            )}

            {/* Login Routes */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/seller" element={<SellerLogin setIsAuthenticated={setIsAuthenticated} />} />

            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
          </Routes>
        </div>
        {/* Render Footer only if the current path is not a login page */}
        {/* {location.pathname !== '/login' && location.pathname !== '/login/admin' && location.pathname !== '/login/seller' && <Footer />} */}
      </div>
    </ItemsProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
