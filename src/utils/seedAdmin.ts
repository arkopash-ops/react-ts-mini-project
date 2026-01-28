import { SHA256 } from "crypto-js";
import type { User } from "../Interfaces/user";
import { v4 as uid } from "uuid";

export function seedAdmin() {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const admin = users.some(u => u.email === "admin@mail.com");

    if (admin) {
        console.log("Admin already exists");
        return;
    }

    const adminUser: User = {
        id: uid(),
        name: "Admin",
        email: "admin@mail.com",
        password: SHA256("admin123").toString(),
        role: "admin",
        status: "active",
        createdAt: new Date().toISOString(),
    };

    users.push(adminUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Admin seeded successfully");
}
