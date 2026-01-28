import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../../Interfaces/restaurant";
import type { MenuItem } from "../../Interfaces/menuItem";
import { CustomBadge } from "../../components/CustomBadge";

const OwnerDashboard = () => {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    const restaurants: Restaurant[] = JSON.parse(
        localStorage.getItem("restaurants") || "[]"
    );

    const ownerRestaurants = currentUser
        ? restaurants.filter(r => r.ownerId === currentUser.id)
        : [];

    function getStatusColor(status: Restaurant["status"]) {
        switch (status) {
            case "active":
                return "success";
            case "inactive":
                return "secondary";
            case "banned":
                return "danger";
            default:
                return "secondary";
        }
    }

    return (
        <main
            className="py-5"
            style={{
                background:
                    "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
                minHeight: "100vh",
            }}
        >
            <div className="container">
                <h2 className="fw-bold text-white text-center mb-5">
                    Owner Dashboard
                </h2>

                {ownerRestaurants.length === 0 ? (
                    <div className="alert alert-dark text-center">
                        You haven't created any restaurants yet.
                    </div>
                ) : (
                    <div className="row g-4">
                        {ownerRestaurants.map(r => {
                            // Get menu items for this restaurant
                            const menuItems: MenuItem[] = JSON.parse(
                                localStorage.getItem("menuItems") || "[]"
                            );
                            const restaurantMenu = menuItems.filter(
                                (m: MenuItem) => m.restaurantId === r.id
                            );

                            return (
                                <div key={r.id} className="col-md-6 col-lg-4">
                                    <div className="card h-100 bg-dark text-white border-0 rounded-4 shadow-lg">
                                        <img
                                            src={
                                                r.image ??
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuef8AANiMD4T1o3DPb9klZUrK46kH4Zz-4l_DfjNmg"
                                            }
                                            alt={r.name}
                                            className="card-img-top rounded-top-4"
                                            style={{
                                                height: "280px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        <div className="card-body">
                                            <h5 className="fw-bold">{r.name}</h5>
                                            <p className="text-secondary small">{r.address}</p>

                                            {/* Cuisine Badges */}
                                            <div className="mb-3">
                                                {r.cuisine.map(c => (
                                                    <CustomBadge key={c} pill color="light" className="me-1">
                                                        {c}
                                                    </CustomBadge>
                                                ))}
                                            </div>

                                            {/* Menu Items as Cards */}
                                            <div className="mb-3">
                                                {restaurantMenu.length === 0 ? (
                                                    <p className="text-secondary small">No menu items yet.</p>
                                                ) : (
                                                    <div className="row g-2">
                                                        {restaurantMenu.map(item => (
                                                            <div key={item.id} className="col-6">
                                                                <div className="card bg-light text-dark rounded-3 h-100">
                                                                    {item.image && (
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            className="card-img-top rounded-top-3"
                                                                            style={{ height: "100px", objectFit: "cover" }}
                                                                        />
                                                                    )}
                                                                    <div className="card-body p-2">
                                                                        <h6 className="fw-bold mb-1">{item.name}</h6>
                                                                        <p className="small mb-1">{item.description}</p>
                                                                        <p className="small mb-0">
                                                                            ₹{item.price.toFixed(2)}
                                                                            {item.isVegetarian && (
                                                                                <strong><span className="ms-2 text-success">Veg</span></strong>
                                                                            )}
                                                                        </p>
                                                                        <CustomBadge
                                                                            pill
                                                                            color={
                                                                                item.status === "available"
                                                                                    ? "success"
                                                                                    : item.status === "unavailable"
                                                                                    ? "secondary"
                                                                                    : "danger"
                                                                            }
                                                                            className="mt-1 small"
                                                                        >
                                                                            {item.status}
                                                                        </CustomBadge>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <CustomBadge pill color={getStatusColor(r.status)}>
                                                    {r.status}
                                                </CustomBadge>

                                                <button
                                                    className="btn btn-sm btn-outline-light"
                                                    onClick={() => navigate(`/restaurant/edit/${r.id}`)}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OwnerDashboard;
