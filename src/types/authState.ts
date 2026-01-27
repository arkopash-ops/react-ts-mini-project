import type { User } from "../Interfaces/user";

export type AuthState =
    | User
    | null; // null is Guest
