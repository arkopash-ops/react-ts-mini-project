import type { Cuisine } from "../types/cuisine";
import type { Status } from "../types/status";

export interface Restaurant {
    id: number;
    name: string;
    ownerId: number; // User.id where role is 'owner'
    address: string;
    cuisine: Cuisine[];
    image?: string;
    status: Status;
    operatingHours?: string;
    createdAt?: string;
}
