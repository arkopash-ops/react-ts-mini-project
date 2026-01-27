import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { Role } from "../types/role";

interface CurrentUser {
    role: Role;
    name: string;
}

export const Navbar: React.FC = () => {
    const [authUser, setAuthUser] = useState<CurrentUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const rawUser = localStorage.getItem("currentUser");
        if (rawUser) { setTimeout(() => setAuthUser(JSON.parse(rawUser)), 0); }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setAuthUser(null);
        navigate("/");
    };

    const isLoggedIn = !!authUser;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container-fluid">
                <NavLink className="navbar-brand fw-bold" to="/">
                    Bon Appétit
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {/* Guest Links */}
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/about">
                                        About Us
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/contact">
                                        Contact Us
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin Link */}
                        {isLoggedIn && authUser.role === "admin" && (
                            <>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/adminDashboard">
                                        Admin Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/about">
                                        About Us
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/contact">
                                        Contact Us
                                    </NavLink>
                                </li>
                            </>

                        )}

                        {/* User */}
                        {isLoggedIn && (authUser.role === "user" || authUser.role === "owner") && (
                            <>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/userhome">
                                        User Home
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/about">
                                        About Us
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/contact">
                                        Contact Us
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Logout */}
                        {isLoggedIn && (
                            <li className="nav-item ms-3">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={handleLogout}
                                    style={{ textDecoration: "none", color: "#fff" }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
