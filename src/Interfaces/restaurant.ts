import type { Cuisine } from "../types/cuisine";
import type { Status } from "../types/status";

export interface Restaurant {
    id: string;
    name: string;
    ownerId: string; // User.id where role is 'owner'
    address: string;
    cuisine: Cuisine[];
    image?: string | null;
    status: Status;
    operatingHours?: string;
    createdAt?: string;
}
