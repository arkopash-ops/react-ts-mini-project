import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SHA256 from "crypto-js/sha256";
import type { User } from "../../Interfaces/user";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<User>>({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
            const emailExists = users.some(user => user.email === formData.email);
            
            if (emailExists) {
                alert("Email already registered!");
                return;
            }

            const hashedPassword = SHA256(formData.password!).toString();

            const newUser: User = {
                id: Date.now(),
                name: formData.name!,
                email: formData.email!,
                phone: formData.phone || undefined,
                password: hashedPassword,
                role: "user",
                status: "active",
                createdAt: new Date().toISOString(),
            };

            localStorage.setItem(
                "users",
                JSON.stringify([...users, newUser])
            );

            console.log("Registered User:", newUser);
            alert("Registration successful!");

            navigate("/login");
        } catch (err) {
            console.error("Failed to save data:", err);
            alert("Something went wrong while saving your data. Please try again.");
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
                                        className="form-control"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="mb-3">
                                    <label className="form-label">Phone (optional)</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
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
