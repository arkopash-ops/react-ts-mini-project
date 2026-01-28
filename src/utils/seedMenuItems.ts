import type { MenuItem } from "@/Interfaces/menuItem";
import type { Restaurant } from "@/Interfaces/restaurant";
import type { Cuisine } from "@/types/cuisine";
import type { FoodStatus } from "@/types/foodStatus";
import type { MenuCategory } from "@/types/menuCategory";
import { v4 as uid } from "uuid";


const menuImages: Record<string, string[]> = {
    // starters
    "Spring Rolls": [
        "https://www.elmundoeats.com/wp-content/uploads/2024/02/A-stack-of-crispy-spring-rolls-on-a-plate.jpg",
        "https://herbsandflour.com/wp-content/uploads/2023/10/Crispy-Vegetable-Spring-Rolls-Recipe-791x1024.jpg",
        "https://myfoodstory.com/wp-content/uploads/2022/06/Veg-Spring-Rolls-2.jpg",
    ],
    "Bruschetta": [
        "https://cdn.pixabay.com/photo/2020/10/01/22/39/gourmet-5619887_1280.jpg",
        "https://urbanfarmandkitchen.com/wp-content/uploads/2023/03/burrata-bruschetta-2.jpg",
    ],
    "Chicken Wings": [
        "https://www.allrecipes.com/thmb/L-44UJt2A4DdWTfPdhOMCpp21C4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/241152-fried-chicken-wings-ddmfs-hero-3x4-1260-d37ffaac793c4db7a4ced4ab24a5d2ee.jpg",
        "https://www.simplyrecipes.com/thmb/mt7JGGLhg3EkaEA0CmRKlHKgYt0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Microwave-Wings-LEAD-03-143e9166991e4d978bc6cea279dcc58b.jpg",
    ],
    "Paneer Tikka": [
        "https://www.cookwithkushi.com/wp-content/uploads/2023/02/paneer_tikka_at_home_01.jpg",
        "https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2023/10/Pahadi-Paneer-Tikka-Recipe-01-720x1080.jpg.webp",
    ],

    // main
    "Butter Chicken": [
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg",
    ],
    "Sushi Platter": [
        "https://cdn.pixabay.com/photo/2024/05/02/18/00/sushi-8735298_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/07/26/11/48/sushi-2541472_1280.jpg",
    ],
    "Spaghetti Carbonara": [
        "https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/01/08/13/13/spaghetti-4750055_1280.jpg",
    ],
    "Tacos": [
        "https://cdn.pixabay.com/photo/2019/09/22/09/47/tacos-4495602_1280.jpg",
        "https://cdn.pixabay.com/photo/2019/09/26/04/01/tacos-pastor-4505032_1280.jpg",
    ],

    // dessert
    "Gulab Jamun": [
        "https://cdn.pixabay.com/photo/2014/06/18/15/48/indian-sweet-371357_1280.jpg",
        "https://cdn.pixabay.com/photo/2025/04/17/06/00/how-to-create-new-colour-9539269_1280.jpg",
    ],
    "Mochi": [
        "https://cdn.pixabay.com/photo/2016/03/04/02/11/hinamatsuri-1235341_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/26/10/36/dessert-1860423_1280.jpg",
    ],
    "Tiramisu": [
        "https://cdn.pixabay.com/photo/2017/10/28/19/07/tiramisu-2897900_1280.jpg",
        "https://cdn.pixabay.com/photo/2019/03/14/19/02/tiramisu-4055650_1280.jpg",
    ],
    "Churros": [
        "https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_1280.jpg",
        "https://cdn.pixabay.com/photo/2019/10/31/18/30/transfer-the-dough-to-a-4592535_960_720.jpg",
    ],

    // beverage
    "Lassi": [
        "https://cdn.pixabay.com/photo/2021/07/14/09/30/lassi-6465557_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/03/12/12/31/food-3219503_1280.jpg",
    ],
    "Green Tea": [
        "https://cdn.pixabay.com/photo/2023/02/22/19/13/gruner-tee-7807229_1280.jpg",
        "https://cdn.pixabay.com/photo/2018/07/10/11/37/green-tea-3528472_1280.jpg",
    ],
    "Cappuccino": [
        "https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/04/05/21/32/coffee-6154681_1280.jpg",
    ],
    "Margarita": [
        "https://cdn.pixabay.com/photo/2020/09/21/17/00/margarita-5590642_1280.jpg",
        "https://cdn.pixabay.com/photo/2024/09/29/22/55/margarita-9084460_1280.jpg",
    ],
};


export function seedMenuItems() {
    const restaurants: Restaurant[] = JSON.parse(
        localStorage.getItem("restaurants") || "[]"
    );

    const menuItems: MenuItem[] = JSON.parse(
        localStorage.getItem("menuItems") || "[]"
    );

    if (!restaurants.length) {
        console.warn("No restaurants found. Seed restaurants first.");
        return;
    }

    const menuNames: Record<MenuCategory, string[]> = {
        starter: ["Spring Rolls", "Bruschetta", "Chicken Wings", "Paneer Tikka"],
        main: ["Butter Chicken", "Sushi Platter", "Spaghetti Carbonara", "Tacos"],
        dessert: ["Gulab Jamun", "Mochi", "Tiramisu", "Churros"],
        beverage: ["Lassi", "Green Tea", "Cappuccino", "Margarita"],
    };

    const cuisines: Cuisine[] = [
        "Indian",
        "Chinese",
        "Italian",
        "Mexican",
        "Japanese",
        "Thai",
        "American",
    ];

    const descriptions = [
        "A delicious treat for any occasion.",
        "Chef's special recipe.",
        "Best seller in our restaurant.",
        "Made with fresh ingredients.",
    ];

    let createdCount = 0;

    restaurants.forEach((restaurant) => {
        const alreadyExists = menuItems.some(
            (item) => item.restaurantId === restaurant.id
        );
        if (alreadyExists) return;

        (Object.keys(menuNames) as MenuCategory[]).forEach((category) => {
            menuNames[category].forEach((name) => {
                const images = menuImages[name] ?? [];

                const menuItem: MenuItem = {
                    id: uid(),
                    restaurantId: restaurant.id,
                    name,
                    category,
                    price: Math.floor(Math.random() * 200 + 50),
                    description:
                        descriptions[Math.floor(Math.random() * descriptions.length)],
                    cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
                    status: "available" as FoodStatus,
                    isVegetarian: !["Chicken Wings", "Butter Chicken"].includes(name),
                    image:
                        images.length > 0
                            ? images[Math.floor(Math.random() * images.length)]
                            : undefined,
                };

                menuItems.push(menuItem);
                createdCount++;
            });
        });
    });

    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    console.log(`${createdCount} menu items seeded successfully`);
}
