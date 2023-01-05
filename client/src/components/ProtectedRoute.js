import React, { Fragment } from "react";

import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

const ProtectedRoute = ({ isAdmin, children }) => {
  if (isAuthenticated() === false) {
    return <Navigate to="/signin" />;
  }

  if (isAdmin === true && isAuthenticated().role !== "admin") {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
