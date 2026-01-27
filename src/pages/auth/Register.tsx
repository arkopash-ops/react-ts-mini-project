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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center">Register</h2>

                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>

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

                                {/* Phone */}
                                <div className="mb-3">
                                    <label className="form-label">Phone (optional)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <div className="invalid-feedback">{errors.phone}</div>
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
                                    Register
                                </button>
                            </form>

                            <p className="mt-3 text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
