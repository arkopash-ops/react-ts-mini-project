import type { Restaurant } from "@/Interfaces/restaurant";
import type { User } from "@/Interfaces/user";
import type { Cuisine } from "@/types/cuisine";
import { v4 as uid } from "uuid";

export function seedRestaurants() {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const restaurants: Restaurant[] = JSON.parse(
        localStorage.getItem("restaurants") || "[]"
    );

    const owners = users.filter(user => user.role === "owner");

    if (!owners.length) {
        console.warn("No owners found. Seed owners first.");
        return;
    }

    const cuisines: Cuisine[] = [
        "Indian",
        "Chinese",
        "Italian",
        "Mexican",
        "Japanese",
        "Thai",
        "American",
    ];

    const getRandomCuisines = (count: number): Cuisine[] => {
        return [...cuisines]
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
    };

    const getCuisineCount = (): number => {
        return Math.random() > 0.4 ? 4 : 5;
    };

    let createdCount = 0;

    owners.forEach((owner, index) => {
        const alreadyHasRestaurant = restaurants.some(
            r => r.ownerId === owner.id
        );

        if (alreadyHasRestaurant) return;

        const newRestaurant: Restaurant = {
            id: uid(),
            name: `${owner.name}'s Kitchen`,
            ownerId: owner.id,
            address: `Street ${index + 1}, Food City`,
            cuisine: getRandomCuisines(getCuisineCount()),
            image: null,
            status: "active",
            operatingHours: "09:00 AM - 11:00 PM",
            createdAt: new Date().toISOString(),
        };

        restaurants.push(newRestaurant);
        createdCount++;
    });

    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    console.log(`${createdCount} restaurants seeded successfully`);
    console.log(restaurants);
}
