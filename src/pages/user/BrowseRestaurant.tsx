import { useMemo, useState } from "react";
import type { MenuItem } from "@/Interfaces/menuItem";
import type { Restaurant } from "@/Interfaces/restaurant";
import type { Cuisine } from "@/types/cuisine";
import { CustomBadge } from "@/components/CustomBadge";

const fallbackRestaurantImage =
  "https://cdn.pixabay.com/photo/2017/08/10/04/49/restaurant-2618315_1280.jpg";
const fallbackMenuImage =
  "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg";

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
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
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

  const selectedRestaurant = useMemo(() => {
    if (!selectedRestaurantId) {
      return null;
    }
    return restaurants.find((restaurant) => restaurant.id === selectedRestaurantId);
  }, [restaurants, selectedRestaurantId]);

  const selectedRestaurantMenu = useMemo(() => {
    if (!selectedRestaurantId) {
      return [];
    }
    const items = menuByRestaurant.get(selectedRestaurantId) ?? [];
    return items.filter((item) => item.status === "available");
  }, [menuByRestaurant, selectedRestaurantId]);

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
                        onClick={() => setSelectedRestaurantId(restaurant.id)}
                      >
                        View Menu
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>

      {selectedRestaurant && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1050 }}
        >
          <div
            className="card border-0 rounded-4 shadow-lg overflow-hidden w-100"
            style={{ maxWidth: "980px", maxHeight: "92vh" }}
          >
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Restaurant Menu</h5>
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={() => setSelectedRestaurantId(null)}
              >
                Close
              </button>
            </div>

            <div className="card-body overflow-auto">
              <div className="row g-3 mb-4">
                <div className="col-md-5">
                  <img
                    src={selectedRestaurant.image || fallbackRestaurantImage}
                    alt={selectedRestaurant.name}
                    className="img-fluid rounded-3 w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-7">
                  <h4 className="fw-bold mb-2">{selectedRestaurant.name}</h4>
                  <p className="text-secondary mb-2">{selectedRestaurant.address}</p>
                  <p className="small mb-2">
                    <strong>Hours:</strong>{" "}
                    {selectedRestaurant.operatingHours || "Not provided"}
                  </p>
                  <div>
                    {selectedRestaurant.cuisine.map((cuisine) => (
                      <CustomBadge
                        key={`${selectedRestaurant.id}-modal-${cuisine}`}
                        pill
                        color="dark"
                        className="me-1 mb-1"
                      >
                        {cuisine}
                      </CustomBadge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedRestaurantMenu.length === 0 ? (
                <div className="alert alert-light mb-0">
                  No available menu items right now.
                </div>
              ) : (
                categories.map((category) => {
                  const categoryItems = selectedRestaurantMenu.filter(
                    (item) => item.category === category
                  );

                  if (categoryItems.length === 0) {
                    return null;
                  }

                  return (
                    <section key={`${selectedRestaurant.id}-modal-${category}`} className="mb-4">
                      <h6 className="text-uppercase fw-bold mb-3">{category}</h6>
                      <div className="row g-3">
                        {categoryItems.map((item) => (
                          <article key={item.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 border-0 shadow-sm">
                              <img
                                src={item.image || fallbackMenuImage}
                                alt={item.name}
                                className="card-img-top"
                                style={{ height: "150px", objectFit: "cover" }}
                              />
                              <div className="card-body">
                                <h6 className="fw-bold mb-1">{item.name}</h6>
                                <p className="small text-secondary mb-2">
                                  {item.description || "Freshly prepared item."}
                                </p>
                                <p className="fw-semibold mb-0">
                                  Rs. {item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BrowseRestaurant;
