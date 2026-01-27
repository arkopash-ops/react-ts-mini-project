import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SHA256 from "crypto-js/sha256";
import type { User } from "../../Interfaces/user";

type RegisterForm = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

type FormError = Partial<Record<keyof RegisterForm, string>>;

export default function Register() {
    const navigate = useNavigate();

    const initialFormData: RegisterForm = {
        name: "",
        email: "",
        phone: "",
        password: "",
    };

    const [formData, setFormData] = useState<RegisterForm>(initialFormData);
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

        if (!formData.name.trim()) {
            newErrors.name = "First name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 10 digits";
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

            const emailExists = users.some(
                user => user.email === formData.email
            );

            if (emailExists) {
                alert("Email already registered!\nPlease use another Email.");
                return;
            }

            const newUser: User = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                password: SHA256(formData.password).toString(),
                role: "user",
                status: "active",
                createdAt: new Date().toISOString(),
            };

            localStorage.setItem("users", JSON.stringify([...users, newUser]));

            alert("Registration successful!");
            setFormData(initialFormData);
            setErrors({});
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <main
            className="min-vh-100 d-flex align-items-center"
            style={{
                background: "linear-gradient(135deg, #1f1f1f, #f1f1f1)"
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4">

                                <div className="text-center mb-4">
                                    <h2 className="fw-bold">Create Account</h2>
                                    <p className="text-muted mb-0">
                                        Join us and start ordering your favorite food
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""
                                                }`}
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>

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

                                    {/* Phone */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Phone <span className="text-muted">(optional)</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={`form-control form-control-lg ${errors.phone ? "is-invalid" : ""
                                                }`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="10-digit number"
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">{errors.phone}</div>
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
                                            placeholder="At least 6 characters"
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-lg w-100 mt-2"
                                    >
                                        Register
                                    </button>
                                </form>

                                <p className="mt-4 text-center text-muted">
                                    Already have an account?{" "}
                                    <Link to="/login" className="fw-semibold text-decoration-none">
                                        Login
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
