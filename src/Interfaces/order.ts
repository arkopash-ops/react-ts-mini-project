import type { OrderStatus } from "../types/OrderStatus";
import type { OrderItem } from "./orederItem";

export interface Order {
    id: number;
    restaurantId: number;
    userId: number; // customer (User with role 'user')
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    deliveryAddress: string;
    createdAt?: string;
}
