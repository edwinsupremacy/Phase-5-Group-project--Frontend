import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SellerLogin from './components/SellerLogin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/login/seller" element={<SellerLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
