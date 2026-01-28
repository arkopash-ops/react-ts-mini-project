import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Restaurant } from "../../Interfaces/restaurant";
import type { Cuisine } from "../../types/cuisine";
import { v4 as uid } from "uuid";

interface RestaurantFormData {
    name: string;
    address: string;
    cuisine: Cuisine[];
    image: string;
    operatingHours: string;
}

const CUISINES: Cuisine[] = [
    "Indian",
    "Japanese",
    "Chinese",
    "Italian",
    "Mexican",
    "American",
    "Thai",
];

const RestaurantInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    const restaurants: Restaurant[] = JSON.parse(
        localStorage.getItem("restaurants") || "[]"
    );

    const restaurantToEdit = isEditMode
        ? restaurants.find(r => r.id === id)
        : null;

    const [formData, setFormData] = useState<RestaurantFormData>(() => {
        if (restaurantToEdit) {
            return {
                name: restaurantToEdit.name,
                address: restaurantToEdit.address,
                cuisine: restaurantToEdit.cuisine,
                image: restaurantToEdit.image ?? "",
                operatingHours: restaurantToEdit.operatingHours ?? "",
            };
        }

        return {
            name: "",
            address: "",
            cuisine: [],
            image: "",
            operatingHours: "",
        };
    });

    useEffect(() => {
        if (
            isEditMode &&
            (!restaurantToEdit ||
                restaurantToEdit.ownerId !== currentUser?.id)
        ) {
            navigate("/ownerDashboard");
        }
    }, [
        isEditMode,
        restaurantToEdit,
        currentUser?.id,
        navigate,
    ]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function toggleCuisine(cuisine: Cuisine) {
        setFormData(prev => ({
            ...prev,
            cuisine: prev.cuisine.includes(cuisine)
                ? prev.cuisine.filter(c => c !== cuisine)
                : [...prev.cuisine, cuisine],
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.name || !formData.address || formData.cuisine.length === 0) {
            alert("Fill all required fields");
            return;
        }

        if (isEditMode && restaurantToEdit) {
            const updatedRestaurants = restaurants.map(r =>
                r.id === id
                    ? {
                          ...r,
                          ...formData,
                          image: formData.image || null,
                          operatingHours:
                              formData.operatingHours || undefined,
                      }
                    : r
            );

            localStorage.setItem(
                "restaurants",
                JSON.stringify(updatedRestaurants)
            );

            alert("Restaurant updated!");
        } else {
            const newRestaurant: Restaurant = {
                id: uid(),
                ownerId: currentUser.id,
                status: "active",
                createdAt: new Date().toISOString(),
                ...formData,
                image: formData.image || null,
                operatingHours:
                    formData.operatingHours || undefined,
            };

            localStorage.setItem(
                "restaurants",
                JSON.stringify([...restaurants, newRestaurant])
            );

            alert("Restaurant created!");
        }

        navigate("/ownerDashboard");
    }

    return (
        <main
            className="min-vh-100 d-flex align-items-center"
            style={{
                background:
                    "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card shadow-lg rounded-4">
                            <div className="card-body p-4">
                                <h2 className="fw-bold text-center mb-4">
                                    {isEditMode
                                        ? "Edit Restaurant"
                                        : "Create Restaurant"}
                                </h2>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        name="name"
                                        className="form-control mb-3"
                                        placeholder="Restaurant Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                    <textarea
                                        name="address"
                                        className="form-control mb-3"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />

                                    <div className="mb-3">
                                        {CUISINES.map(c => (
                                            <label key={c} className="me-3">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.cuisine.includes(
                                                        c
                                                    )}
                                                    onChange={() =>
                                                        toggleCuisine(c)
                                                    }
                                                />{" "}
                                                {c}
                                            </label>
                                        ))}
                                    </div>

                                    <input
                                        name="image"
                                        className="form-control mb-3"
                                        placeholder="Image URL"
                                        value={formData.image}
                                        onChange={handleChange}
                                    />

                                    <input
                                        name="operatingHours"
                                        className="form-control mb-4"
                                        placeholder="10 AM - 11 PM"
                                        value={formData.operatingHours}
                                        onChange={handleChange}
                                    />

                                    <button className="btn btn-dark w-100">
                                        {isEditMode
                                            ? "Update Restaurant"
                                            : "Create Restaurant"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RestaurantInfo;
