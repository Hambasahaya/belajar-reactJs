import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage
    sessionStorage.removeItem('username');

    // Redirect to the login page
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
