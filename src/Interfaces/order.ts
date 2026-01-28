import type { OrderStatus } from "../types/OrderStatus";
import type { OrderItem } from "./orederItem";

export interface Order {
    id: string;
    restaurantId: string;
    userId: string; // customer (User with role 'user')
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    deliveryAddress: string;
    createdAt?: string;
}
