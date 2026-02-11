import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import "@splidejs/react-splide/css";
import Cucina from "./components/pages/Cucina";
import Error404 from "./components/error/Error404";
import Menu from "./components/menu/Menu";
import React from "react";
import Searched from "./components/pages/Searched";
import Details from "./components/pages/Details";
import Cart from "./components/pages/Cart";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import { CartProvider } from "./Context/CartContext";
import UserProfile from "./components/pages/UserProfile";
import Navbar from "./components/pages/Navbar";
import AboutUs from "./components/pages/AboutUs";

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/userProfile" element={<UserProfile user={user} />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/cucina"
          element={<Navigate to="/cucina/italian" replace />}
        />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cucina/:type"
          element={
            <ProtectedRoute>
              <Cucina />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:searchValue"
          element={
            <ProtectedRoute>
              <Searched />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  );
}
