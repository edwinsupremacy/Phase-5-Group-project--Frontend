import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage(response.data.message);
      } catch (err) {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h2>{message}</h2>
      <button onClick={() => {
        localStorage.removeItem('access_token');
        navigate('/login');
      }}>Logout</button>
    </div>
  );
}

export default Home;
