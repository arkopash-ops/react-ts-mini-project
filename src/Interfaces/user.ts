import type { Role } from "@/types/role";
import type { Status } from "@/types/status";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // Hashed Password(SHA-256)
    phone?: string;
    role: Role;
    status: Status;
    createdAt?: string;
}
