import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { Role } from "../types/role";

interface CurrentUser {
    role: Role;
    name: string;
}

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const authUser: CurrentUser | null = (() => {
        const storedUser = localStorage.getItem("currentUser");
        return storedUser ? JSON.parse(storedUser) : null;
    })();

    const isLoggedIn = !!authUser;

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark px-4">
            <div className="container-fluid">
                <NavLink className="navbar-brand fw-bold" to="/">
                    Bon Appétit
                </NavLink>

                {isLoggedIn && (
                    <span className="navbar-text text-light ms-3">
                        | Hello, <strong>{authUser.name}</strong>
                    </span>
                )}

                <div className="collapse navbar-collapse">
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
                            </>
                        )}

                        {/* Admin Link */}
                        {isLoggedIn && authUser.role === "admin" && (
                            <>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/adminDashboard">
                                        Dashboard
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* User */}
                        {isLoggedIn && (authUser.role === "user") && (
                            <>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/userhome">
                                        User Home
                                    </NavLink>
                                </li>

                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/browseRestaurants">
                                        Restaurent
                                    </NavLink>
                                </li>

                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/orders">
                                        My Orders
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Owner */}
                        {isLoggedIn && (authUser.role === "owner") && (
                            <>
                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/ownerDashboard">
                                        Owner Dashboard
                                    </NavLink>
                                </li>

                                <li className="nav-item ms-3">
                                    <NavLink className="nav-link" to="/restaurant/create">
                                        Restaurant Info
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Common Links */}
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

                        {/* Logout */}
                        {isLoggedIn && (
                            <li className="nav-item ms-3">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={handleLogout}
                                    style={{ textDecoration: "none", color: "#ff0000" }}
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
