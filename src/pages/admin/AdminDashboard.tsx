import React, { useState } from "react";
import type { User } from "@/Interfaces/user";
import type { Restaurant } from "@/Interfaces/restaurant";
import { CustomBadge } from "@/components/CustomBadge";

const AdminDashboard: React.FC = () => {
  const [users] = useState<User[]>(() =>
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [restaurants] = useState<Restaurant[]>(() =>
    JSON.parse(localStorage.getItem("restaurants") || "[]")
  );

  const [activeTab, setActiveTab] = useState<"users" | "restaurants">("users");

  const statusColorMap: Record<string, string> = {
    active: "success",
    banned: "danger",
    inactive: "secondary",
  };

  const roleColorMap: Record<string, string> = {
    admin: "primary",
    owner: "info",
    user: "secondary",
  };

  return (
    <section
      className="bg-light py-5"
      style={{
        background:
          "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
      }}
    >
      <main className="container py-5">
        <header className="mb-5 text-center">
          <h1 className="fw-bold display-5 text-light">Admin Dashboard</h1>
          <p className="text-light">Complete overview of users and restaurants</p>
        </header>

        {/* CARD WITH CUSTOM THEME */}
        <div
          className="card text-light"
          style={{
            background:
              "linear-gradient(90deg, #5c47ff, #1a1a2e, #1a1a2e, #5c47ff)",
            border: "none",
          }}
        >
          <div className="card-header border-0 bg-transparent">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                  onClick={() => setActiveTab("users")}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none"
                  }}
                >
                  Users
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "restaurants" ? "active" : ""}`}
                  onClick={() => setActiveTab("restaurants")}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                  }}
                >
                  Restaurants
                </button>
              </li>
            </ul>

          </div>

          <div className="card-body">
            {/* USERS TABLE */}
            {activeTab === "users" && (
              <div>
                <h5 className="card-title text-light">Users</h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle text-light">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center text-muted">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || "—"}</td>
                            <td>
                              <CustomBadge color={roleColorMap[user.role] || "secondary"} pill>
                                {user.role}
                              </CustomBadge>
                            </td>
                            <td>
                              <CustomBadge color={statusColorMap[user.status] || "secondary"} pill>
                                {user.status}
                              </CustomBadge>
                            </td>
                            <td>{user.createdAt || "—"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* RESTAURANTS TABLE */}
            {activeTab === "restaurants" && (
              <div>
                <h5 className="card-title text-light">Restaurants</h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle text-light">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Owner ID</th>
                        <th>Address</th>
                        <th>Cuisines</th>
                        <th>Status</th>
                        <th>Operating Hours</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurants.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center text-muted">
                            No restaurants found
                          </td>
                        </tr>
                      ) : (
                        restaurants.map((r) => (
                          <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{r.ownerId}</td>
                            <td>{r.address}</td>
                            <td>
                              {r.cuisine.map((c, i) => (
                                <CustomBadge key={i} color="dark" className="me-1" pill>
                                  {c}
                                </CustomBadge>
                              ))}
                            </td>
                            <td>
                              <CustomBadge color={statusColorMap[r.status] || "secondary"} pill>
                                {r.status}
                              </CustomBadge>
                            </td>
                            <td>{r.operatingHours || "—"}</td>
                            <td>{r.createdAt || "—"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminDashboard;
