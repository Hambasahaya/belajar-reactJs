import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App.jsx';
import Register from './pages/register.jsx';
import Admin from './pages/Admin.jsx';
import AdminGuru from './pages/AdminGuru.jsx';
import AdminSiswa from './pages/AdminSiswa.jsx';
import AdminLayanan from './pages/AdminLayanan.jsx';
import Logout from './pages/logout.jsx';
import Login from './components/Login.jsx';
import Finis from './components/Finis.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/finis" element={<Finis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminsiwa" element={<AdminSiswa />} />
        <Route path="/adminguru" element={<AdminGuru />} />
        <Route path="/adminlayanan" element={<AdminLayanan />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
