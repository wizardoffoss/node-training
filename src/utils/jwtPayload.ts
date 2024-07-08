import { Role } from "./role.enum";

export type jwtPayload = {
    name: String;
    email: String;
    role: Role;
};
