import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = () => {
    const auth = localStorage.getItem("token");
    return auth ? <Outlet /> : < Navigate to="/login"/> 
}

export default ProtectedRoute;