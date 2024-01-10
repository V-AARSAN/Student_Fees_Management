import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;