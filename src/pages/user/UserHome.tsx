import type { Role } from "@/types/role";
import React from "react";

interface CurrentUser {
  role: Role;
  name: string;
}

const UserHome: React.FC = () => {
  const authUser: CurrentUser | null = (() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  })();

  const isLoggedIn = !!authUser;

  return (
    <main>
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h3 className="display-3">
            Welcome back,
            {isLoggedIn && (
              <span className="navbar-text text-light ms-3">
                {authUser.name}
              </span>
            )}
          </h3>
          <p className="lead mt-3">
            What are you craving today?
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <a href="/browseRestaurants" className="btn btn-light btn-lg fw-bold">
              Browse Restaurants
            </a>
            <a href="/orders" className="btn btn-outline-light btn-lg fw-bold">
              My Orders
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-5 bg-light"
        style={{
          background: "linear-gradient(135deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
        }}
      >
        <div className="container">
          <div className="row text-center g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
                  alt="Browse restaurants"
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-light">Browse Restaurants</h5>
                  <p className="text-secondary">
                    Discover new places and your all-time favorites.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                  alt="Quick reorder"
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-light">Quick Order</h5>
                  <p className="text-secondary">
                    Order your previous meals with one click.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1521305916504-4a1121188589"
                  alt="Live tracking"
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-light">Live Order Tracking</h5>
                  <p className="text-secondary">
                    Track your order in real time from kitchen to door.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Hungry already?</h2>
          <p className="mt-3">
            Your next meal is just a few clicks away.
          </p>
          <a href="/browseRestaurants" className="btn btn-light btn-lg fw-bold mt-2">
            Order Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default UserHome;
