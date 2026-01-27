import type { User } from "@/Interfaces/user";
import { SHA256 } from "crypto-js";

export function seedUsers() {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const totalUsers = 10,
        totalOwner = 10;

    for (let i = 1; i <= totalUsers; i++) {
        const email = `user${i}@mail.com`;

        if (!users.some(u => u.email === email)) {
            const newUser: User = {
                id: Date.now() + i,
                name: `User ${i}`,
                email,
                password: SHA256("user123").toString(),
                role: "user",
                status: "active",
                createdAt: new Date().toISOString(),
            };
            users.push(newUser);
        }
    }

    for (let i = 1; i <= totalOwner; i++) {
        const email = `owner${i}@mail.com`;

        if (!users.some(u => u.email === email)) {
            const newOwner: User = {
                id: Date.now() + i,
                name: `Owner ${i}`,
                email,
                password: SHA256("owner123").toString(),
                role: "owner",
                status: "active",
                createdAt: new Date().toISOString(),
            };
            users.push(newOwner);
        }
    }

    localStorage.setItem("users", JSON.stringify(users));
    console.log(`${totalUsers + totalOwner} users seeded successfully`);
    console.log(users);

}
