import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation(); // ✅ IMPORTANTE
  const token = localStorage.getItem("authToken");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Accesso richiesto", from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
