export interface IUser {
    id: number;
    email: string;
    password_hash: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}
//# sourceMappingURL=auth.d.ts.map