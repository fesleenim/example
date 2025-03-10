import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from './Pages/Login/Login';
import Layout from './Components/Layout';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token])
  return token ? <Layout><Outlet /></Layout>:<LoginPage />
}

export default App;
