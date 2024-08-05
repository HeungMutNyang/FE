import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // 로딩 중
  }
  return isAuthenticated ? Component : <Navigate to="/login" />;
}

export default ProtectedRoute;
