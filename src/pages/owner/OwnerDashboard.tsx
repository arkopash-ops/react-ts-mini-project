import type { Restaurant } from "../../Interfaces/restaurant";
import { CustomBadge } from "../../components/CustomBadge";

const OwnerDashboard = () => {
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    const allRestaurants: Restaurant[] = JSON.parse(
        localStorage.getItem("restaurants") || "[]"
    );

    const ownerRestaurants = currentUser
        ? allRestaurants.filter(r => r.ownerId === currentUser.id)
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
                background: "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
                minHeight: "100vh",
            }}
        >
            <div className="container">
                {/* Heading */}
                <h2 className="fw-bold text-white text-center mb-5">
                    Owner Dashboard
                </h2>

                {/* Content */}
                {ownerRestaurants.length === 0 ? (
                    <div className="alert alert-dark text-center">
                        You haven't created any restaurants yet.
                    </div>
                ) : (
                    <div className="row g-4">
                        {ownerRestaurants.map(restaurant => (
                            <div
                                className="col-md-6 col-lg-4"
                                key={restaurant.id}
                            >
                                <div className="card h-100 shadow-lg bg-dark text-white border-0 rounded-4">
                                    <img
                                        src={restaurant.image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuef8AANiMD4T1o3DPb9klZUrK46kH4Zz-4l_DfjNmg"}
                                        className="card-img-top rounded-top-4"
                                        alt={restaurant.name}
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />

                                    <div className="card-body">
                                        <h5 className="fw-bold mb-1">
                                            {restaurant.name}
                                        </h5>

                                        <p className="text-secondary small mb-2">
                                            {restaurant.address}
                                        </p>

                                        {/* Cuisine */}
                                        <div className="mb-3">
                                            {restaurant.cuisine.map(c => (
                                                <CustomBadge
                                                    key={c}
                                                    color="light"
                                                    pill
                                                    className="me-1"
                                                >
                                                    {c}
                                                </CustomBadge>
                                            ))}
                                        </div>

                                        {/* Status */}
                                        <CustomBadge
                                            color={getStatusColor(
                                                restaurant.status
                                            )}
                                            pill
                                        >
                                            {restaurant.status}
                                        </CustomBadge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OwnerDashboard;
