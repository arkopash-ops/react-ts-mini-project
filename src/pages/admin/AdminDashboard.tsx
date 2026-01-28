import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">
            Admin Dashboard
          </h1>
          <p className="lead mt-3">
            Manage restaurants, orders, and users from one place.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <a href="/admin/restaurants" className="btn btn-light btn-lg fw-bold">
              Manage Restaurants
            </a>
            <a href="/admin/orders" className="btn btn-outline-light btn-lg fw-bold">
              View Orders
            </a>
            <a href="/admin/users" className="btn btn-outline-light btn-lg fw-bold">
              Manage Users
            </a>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section
        className="py-5 bg-light"
        style={{ background: "linear-gradient(135deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)" }}
      >
        <div className="container">
          <div className="row text-center g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                  alt="Restaurant management"
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-light">Restaurant Management</h5>
                  <p className="text-secondary">
                    Add, edit, approve, or suspend restaurant listings.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1605902711622-cfb43c44367f"
                  alt="Order monitoring"
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-light">Order Monitoring</h5>
                  <p className="text-secondary">
                    Track, update, and resolve active orders in real time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1556155092-8707de31f9c4"
                  alt="User management"
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-light">User Management</h5>
                  <p className="text-secondary">
                    View users, manage roles, and handle account issues.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">System Overview</h2>
          <p className="mt-3">
            Keep everything running smoothly and efficiently.
          </p>
          <a href="/admin/reports" className="btn btn-light btn-lg fw-bold mt-2">
            View Reports
          </a>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
