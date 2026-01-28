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

    const restaurantIMG: string[] = [
        "https://cdn.pixabay.com/photo/2022/02/07/03/13/interior-design-6998378_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/07/13/21/13/restaurant-843832_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/02/23/21/10/restaurant-646687_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/10/07/12/33/cafe-5635015_1280.jpg",
        "https://cdn.pixabay.com/photo/2023/05/28/17/34/tavern-8024234_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/08/10/04/49/restaurant-2618315_1280.jpg",
        "https://cdn.pixabay.com/photo/2019/09/12/15/21/resort-4471852_1280.jpg",
        "https://cdn.pixabay.com/photo/2022/10/12/22/58/street-7517679_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/08/22/23/24/restaurant-5509577_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/04/19/17/34/golden-chariot-6192005_1280.jpg"
    ];

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

    const getRandomImage = (): string => {
        return restaurantIMG[Math.floor(Math.random() * restaurantIMG.length)];
    };

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
            image: getRandomImage(),
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
