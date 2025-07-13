import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Logout request when component mounts
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: { // ❌ FIX: Use `headers` (lowercase), not `Headers`
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      })
      .catch((err) => {
        console.error('Logout failed:', err.response?.data || err.message);
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, []);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
