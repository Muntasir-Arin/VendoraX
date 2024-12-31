import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom';
import { SignupPage } from './pages/signup-page';
import { LoginPage } from './pages/login-page';
import { HomePage } from './pages/home-page';
import { ProductsPage } from './pages/all-product-page';
import { ProductDetailPage } from './pages/product-page';
import { NavBar } from './components/nav-bar';


import { ReactNode } from 'react';
import DashboardHome from './pages/dashboard/dashboard-home';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Paths where the NavBar should appear
  const pathsWithNavBar = ['/', '/products', '/products/:id'];

  // Check if the current path matches any in the list
  const shouldShowNavBar = pathsWithNavBar.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      {children}
    </>
  );
};

const AppRoutes: React.FC = () => (
  <Router>
    <Layout>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/products/:id" element={<ProductDetailPage />} />
    <Route path = "/dashboard" element={<DashboardHome />} />
    </Routes>
    </Layout>
  </Router>
);

export default AppRoutes;
