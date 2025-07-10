import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const ProtectionRoute = () => {
  const { user, loading } = useContext(StoreContext);

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectionRoute;
