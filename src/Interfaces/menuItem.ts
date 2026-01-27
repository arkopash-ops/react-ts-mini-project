import type { Cuisine } from "../types/cuisine";
import type { FoodStatus } from "../types/foodStatus";
import type { MenuCategory } from "../types/menuCategory";

export interface MenuItem {
    id: number;
    restaurantId: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category: MenuCategory;
    cuisine?: Cuisine;
    status: FoodStatus;
    isVegetarian?: boolean;
}
