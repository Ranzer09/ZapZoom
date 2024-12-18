import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/Auth/useAuthContext";

const ProtectedRoute = ({ children, type }) => {
  const { user, loading } = useAuthContext();
  //console.log(type,'type')
  const isAuthorized = useMemo(() => {
    return !loading && user && user[type];
  }, [loading, user, type]);

  if (!isAuthorized) {
    return <Navigate to="/Api/" />;
  }

  return children;
};

export default ProtectedRoute;
