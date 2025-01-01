import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import { SignupPage } from "./pages/signup-page";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";
import ProductsPage from "./pages/all-product-page";
import ProductDetailPage from "./pages/product-page";
import { NavBar } from "./components/nav-bar";
import { ReactNode } from "react";
import DashboardHome from "./pages/dashboard/dashboard-home";
import { PurchaseHistoryPage } from "./pages/dashboard/purchase-history";
import { CreateProduct } from "./pages/CreateProduct";
import ProductListing from "./pages/dashboard/my-product";
import ProductEdit from "./pages/edit-product";
import { SellHistoryPage } from "./pages/dashboard/sell-history";
import Footer from "./components/footer";
import AuthMiddleware from "./middleware/authMiddleware";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const pathsWithNavBar = ["/", "/products", "/products/:id"];
  const shouldShowNavBar = pathsWithNavBar.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      {children}
      {shouldShowNavBar && <Footer />}
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
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthMiddleware>
              <DashboardHome />
            </AuthMiddleware>
          }
        />
        <Route
          path="/dashboard/purchasehistory"
          element={
            <AuthMiddleware>
              <PurchaseHistoryPage />
            </AuthMiddleware>
          }
        />
        <Route
          path="/create-product/*"
          element={
            <AuthMiddleware>
              <CreateProduct />
            </AuthMiddleware>
          }
        />
        <Route
          path="/dashboard/myproduct"
          element={
            <AuthMiddleware>
              <ProductListing />
            </AuthMiddleware>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <AuthMiddleware>
              <ProductEdit />
            </AuthMiddleware>
          }
        />
        <Route
          path="/dashboard/lentsoldhistory"
          element={
            <AuthMiddleware>
              <SellHistoryPage />
            </AuthMiddleware>
          }
        />
      </Routes>
    </Layout>
  </Router>
);

export default AppRoutes;
