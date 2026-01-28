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
        <main
            className="min-vh-100 d-flex align-items-center"
            style={{
                    background: "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
                }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4">

                                <div className="text-center mb-4">
                                    <h2 className="fw-bold">Welcome Back</h2>
                                    <p className="text-muted mb-0">
                                        Login to continue ordering delicious food
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""
                                                }`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@mail.com"
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""
                                                }`}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-lg w-100 mt-2"
                                    >
                                        Login
                                    </button>
                                </form>

                                <p className="mt-4 text-center text-muted">
                                    Don’t have an account?{" "}
                                    <Link to="/register" className="fw-semibold text-decoration-none">
                                        Register
                                    </Link>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}
