import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../Interfaces/user";
import { SHA256 } from "crypto-js";

interface LoginFormData {
    email: string;
    password: string;
}

type FormError = Partial<Record<keyof LoginFormData, string>>;

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormError>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function validateForm(): boolean {
        const newErrors: FormError = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

            const user = users.find(u => u.email === formData.email);

            if (!user) {
                alert("Invalid email or password");
                return;
            }

            const hashedPassword = SHA256(formData.password).toString();

            if (hashedPassword !== user.password) {
                alert("Invalid email or password");
                return;
            }

            alert("Login successful!");

            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                })
            );

            switch (user.role) {
                case "admin":
                    navigate("/adminDashboard");
                    break;

                case "owner":
                    navigate("/ownerDashboard");
                    break;

                default:
                    navigate("/userhome");
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
                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
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
