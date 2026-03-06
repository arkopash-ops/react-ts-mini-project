import { useMemo, useState } from "react";
import type { MenuItem } from "@/Interfaces/menuItem";
import type { Restaurant } from "@/Interfaces/restaurant";
import type { Cuisine } from "@/types/cuisine";
import { CustomBadge } from "@/components/CustomBadge";

const fallbackRestaurantImage =
  "https://cdn.pixabay.com/photo/2017/08/10/04/49/restaurant-2618315_1280.jpg";

const categories: MenuItem["category"][] = [
  "starter",
  "main",
  "dessert",
  "beverage",
];

const getSavedRestaurants = (): Restaurant[] =>
  JSON.parse(localStorage.getItem("restaurants") || "[]");

const getSavedMenuItems = (): MenuItem[] =>
  JSON.parse(localStorage.getItem("menuItems") || "[]");

const BrowseRestaurant = () => {
  const [restaurants] = useState<Restaurant[]>(getSavedRestaurants);
  const [menuItems] = useState<MenuItem[]>(getSavedMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | "All">("All");
  const [expandedRestaurantId, setExpandedRestaurantId] = useState<string | null>(
    null
  );

  const availableCuisines = useMemo(() => {
    const cuisineSet = new Set<Cuisine>();
    restaurants.forEach((restaurant) => {
      restaurant.cuisine.forEach((cuisine) => cuisineSet.add(cuisine));
    });
    return ["All", ...Array.from(cuisineSet).sort()] as const;
  }, [restaurants]);

  const visibleRestaurants = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesStatus = restaurant.status === "active";
      const matchesSearch =
        restaurant.name.toLowerCase().includes(normalizedQuery) ||
        restaurant.address.toLowerCase().includes(normalizedQuery);
      const matchesCuisine =
        selectedCuisine === "All" || restaurant.cuisine.includes(selectedCuisine);

      return matchesStatus && matchesSearch && matchesCuisine;
    });
  }, [restaurants, searchTerm, selectedCuisine]);

  const menuByRestaurant = useMemo(() => {
    const grouped = new Map<string, MenuItem[]>();
    menuItems.forEach((item) => {
      if (!grouped.has(item.restaurantId)) {
        grouped.set(item.restaurantId, []);
      }
      grouped.get(item.restaurantId)?.push(item);
    });
    return grouped;
  }, [menuItems]);

  return (
    <main
      className="py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #000000, #263145, #e9f0ff, #263145, #000000)",
      }}
    >
      <div className="container">
        <section className="text-center mb-4">
          <h2 className="fw-bold text-white mb-2">Browse Restaurants</h2>
          <p className="text-light mb-0">
            Search by name or address and explore menus by cuisine.
          </p>
        </section>

        <section className="card border-0 rounded-4 shadow-lg p-3 p-md-4 mb-4">
          <div className="row g-3">
            <div className="col-md-8">
              <label htmlFor="searchRestaurant" className="form-label fw-semibold">
                Search
              </label>
              <input
                id="searchRestaurant"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by restaurant name or address"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="cuisineFilter" className="form-label fw-semibold">
                Cuisine
              </label>
              <select
                id="cuisineFilter"
                className="form-select"
                value={selectedCuisine}
                onChange={(event) =>
                  setSelectedCuisine(event.target.value as Cuisine | "All")
                }
              >
                {availableCuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {visibleRestaurants.length === 0 ? (
          <div className="alert alert-light text-center">
            No active restaurants matched your search.
          </div>
        ) : (
          <section className="row g-4">
            {visibleRestaurants.map((restaurant) => {
              const items = menuByRestaurant.get(restaurant.id) ?? [];
              const availableItems = items.filter(
                (item) => item.status === "available"
              );
              const isExpanded = expandedRestaurantId === restaurant.id;

              return (
                <article key={restaurant.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 rounded-4 shadow-lg overflow-hidden">
                    <img
                      src={restaurant.image || fallbackRestaurantImage}
                      alt={restaurant.name}
                      className="card-img-top"
                      style={{ height: "230px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold mb-1">{restaurant.name}</h5>
                      <p className="text-secondary small mb-2">{restaurant.address}</p>

                      <div className="mb-2">
                        {restaurant.cuisine.map((cuisine) => (
                          <CustomBadge
                            key={`${restaurant.id}-${cuisine}`}
                            pill
                            color="dark"
                            className="me-1 mb-1"
                          >
                            {cuisine}
                          </CustomBadge>
                        ))}
                      </div>

                      <p className="small mb-2">
                        <strong>Hours:</strong>{" "}
                        {restaurant.operatingHours || "Not provided"}
                      </p>
                      <p className="small text-muted mb-3">
                        {availableItems.length} menu items available
                      </p>

                      <button
                        type="button"
                        className="btn btn-dark mt-auto"
                        onClick={() =>
                          setExpandedRestaurantId((currentId) =>
                            currentId === restaurant.id ? null : restaurant.id
                          )
                        }
                      >
                        {isExpanded ? "Hide Menu" : "View Menu"}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 border-top pt-3">
                          {availableItems.length === 0 ? (
                            <p className="small text-muted mb-0">
                              No available menu items right now.
                            </p>
                          ) : (
                            categories.map((category) => {
                              const categoryItems = availableItems.filter(
                                (item) => item.category === category
                              );
                              if (categoryItems.length === 0) {
                                return null;
                              }

                              return (
                                <div key={`${restaurant.id}-${category}`} className="mb-2">
                                  <p className="text-uppercase fw-bold small mb-1">
                                    {category}
                                  </p>
                                  <ul className="list-group list-group-flush">
                                    {categoryItems.slice(0, 3).map((item) => (
                                      <li
                                        key={item.id}
                                        className="list-group-item px-0 py-1 small d-flex justify-content-between"
                                      >
                                        <span>{item.name}</span>
                                        <strong>Rs. {item.price.toFixed(2)}</strong>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default BrowseRestaurant;
