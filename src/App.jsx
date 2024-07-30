import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import SellerLogin from './components/SellerLogin';
import About from './components/About';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar />}
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </>
          )}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/seller" element={<SellerLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
