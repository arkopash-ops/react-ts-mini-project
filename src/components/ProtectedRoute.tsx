import React from 'react'
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!authUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}
