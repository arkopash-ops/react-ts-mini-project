import React from 'react'
import { NavLink } from 'react-router'

export const Navbar: React.FC = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <NavLink className="navbar-brand fw-bold" to="/">
                            Bon Appétit
                        </NavLink>

                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item ms-3">
                                <NavLink className="nav-link active" to="/">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item ms-3">
                                <NavLink className="nav-link active" to="/userhome">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item ms-3">
                                <NavLink className="nav-link active" to="/register">
                                    Register
                                </NavLink>
                            </li>

                            <li className="nav-item ms-3">
                                <NavLink className="nav-link active" to="/login">
                                    Login
                                </NavLink>
                            </li>

                            <li className="nav-item ms-3">
                                <NavLink className="nav-link active" to="/about">
                                    About Us
                                </NavLink>
                            </li>

                            <li className="nav-item ms-3">
                                <NavLink className="nav-link active" to="/contact">
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
