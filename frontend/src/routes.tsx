import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupPage } from './pages/signup-page';
import { LoginPage } from './pages/login-page';
import { HomePage } from './pages/home-page';
import { ProductsPage } from './pages/all-product-page';
import { ProductDetailPage } from './pages/product-page';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductDetailPage />} />

    
    </Routes>
  </Router>
);

export default AppRoutes;
