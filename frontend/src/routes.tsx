import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupPage } from './pages/signup-page';
import { LoginPage } from './pages/login-page';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    
    </Routes>
  </Router>
);

export default AppRoutes;
