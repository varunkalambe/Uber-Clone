import React, { useEffect, useContext, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const context = useContext(UserDataContext);
  if (!context) return null;
  const { user, setUser } = context;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log('❌ No token found, redirecting to login');
      navigate('/login');
      setIsLoading(false);
      return;
    }

    console.log('🔐 Token found, verifying user...');
    console.log('👉 Token:', token.substring(0, 20) + '...');
    
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('✅ Auth check successful');
        console.log('👉 Response data:', response.data);
        
        const profile = response.data;
        
        // More robust checking for user data
        if (profile && (profile._id || profile.id)) {
          setUser(profile);
          console.log('✅ User set successfully:', profile._id || profile.id);
        } else {
          console.error('❌ Invalid user data structure:', profile);
          throw new Error('Invalid user data structure');
        }
      })
      .catch((err) => {
        console.error('❌ Auth check failed:', err.response?.data || err.message || err);
        
        // Clear invalid token
        localStorage.removeItem('token');
        
        // Navigate to login
        navigate('/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate, setUser]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectWrapper;