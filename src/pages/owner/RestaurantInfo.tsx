import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../../Interfaces/restaurant";
import type { Cuisine } from "../../types/cuisine";

interface RestaurantFormData {
    name: string;
    address: string;
    cuisine: Cuisine[];
    image: string;
    operatingHours: string;
}

type FormError = Partial<Record<keyof RestaurantFormData, string>>;

const CUISINES: Cuisine[] = [
    "Indian",
    "Japanese",
    "Chinese",
    "Italian",
    "Mexican",
    "American",
    "Thai",
    "Others",
];

const RestaurantInfo = () => {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    const [formData, setFormData] = useState<RestaurantFormData>({
        name: "",
        address: "",
        cuisine: [],
        image: "",
        operatingHours: "",
    });

    const [errors, setErrors] = useState<FormError>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function handleCuisineChange(cuisine: Cuisine) {
        setFormData(prev => ({
            ...prev,
            cuisine: prev.cuisine.includes(cuisine)
                ? prev.cuisine.filter(c => c !== cuisine)
                : [...prev.cuisine, cuisine],
        }));
    }

    function validateForm(): boolean {
        const newErrors: FormError = {};

        if (!formData.name.trim()) {
            newErrors.name = "Restaurant name is required";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (formData.cuisine.length === 0) {
            newErrors.cuisine = "Select at least one cuisine";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validateForm()) return;

        if (!currentUser || currentUser.role !== "owner") {
            alert("Only owners can create restaurants");
            return;
        }

        const restaurants: Restaurant[] = JSON.parse(
            localStorage.getItem("restaurants") || "[]"
        );

        const newRestaurant: Restaurant = {
            id: Date.now(),
            name: formData.name,
            ownerId: currentUser.id,
            address: formData.address,
            cuisine: formData.cuisine,
            image: formData.image || undefined,
            status: "active",
            operatingHours: formData.operatingHours || undefined,
            createdAt: new Date().toISOString(),
        };

        restaurants.push(newRestaurant);
        localStorage.setItem("restaurants", JSON.stringify(restaurants));

        alert("Restaurant created successfully!");
        navigate("/ownerDashboard");
    }

    return (
        <main
            className="min-vh-100 d-flex align-items-center"
            style={{ background: "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)" }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4">

                                <div className="text-center mb-4">
                                    <h2 className="fw-bold">Create Restaurant</h2>
                                    <p className="text-muted mb-0">
                                        Add your restaurant details
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Restaurant Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Address
                                        </label>
                                        <textarea
                                            name="address"
                                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                        {errors.address && (
                                            <div className="invalid-feedback">{errors.address}</div>
                                        )}
                                    </div>

                                    {/* Cuisine */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Cuisine
                                        </label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {CUISINES.map(cuisine => (
                                                <div key={cuisine} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={formData.cuisine.includes(cuisine)}
                                                        onChange={() => handleCuisineChange(cuisine)}
                                                    />
                                                    <label className="form-check-label">{cuisine}</label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.cuisine && (
                                            <div className="text-danger small mt-1">{errors.cuisine}</div>
                                        )}
                                    </div>

                                    {/* Image URL */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Image URL (optional)</label>
                                        <input
                                            type="text"
                                            name="image"
                                            className="form-control"
                                            value={formData.image}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Operating Hours */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Operating Hours</label>
                                        <input
                                            type="text"
                                            name="operatingHours"
                                            className="form-control"
                                            placeholder="10:00 AM - 11:00 PM"
                                            value={formData.operatingHours}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-lg w-100 mt-2"
                                    >
                                        Create Restaurant
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RestaurantInfo