import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../Interfaces/user";
import { SHA256 } from "crypto-js";

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find(u => u.email = formData.email);

            if (!user) {
                alert("Invalid Email or Password");
                return;
            }

            const hashedPassword = SHA256(formData.password!).toString();

            if (hashedPassword === user.password) {
                alert("Login successful!");

                localStorage.setItem("currentUser", JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));

                navigate("/userhome");
            } else {
                alert("Invalid email or password");
            }

        } catch (err) {
            console.error("Login error:", err);
            alert("An error occurred during login.");
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center">Login</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>

                            <p className="mt-3 text-center">
                                Don’t have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
