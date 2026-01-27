import React from 'react'
import { Navigate } from 'react-router';
import type { Role } from '../types/role';

interface ProtectedRouteProps {
    children: React.ReactElement;
    role: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const authUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!authUser) {
        alert("You need to Login first!");
        return <Navigate to="/" replace />;
    }

    if (role && !role.includes(authUser.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
