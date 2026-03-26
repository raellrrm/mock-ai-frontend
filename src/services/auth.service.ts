import { api } from "@/lib/axios";
import { User } from "@/slices/authSlice";
import { register } from "module";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    name: string;
}

interface AuthResponse {
    message: string;
    user: User
}

export const authService = {

    async login(data: LoginData): Promise<User> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data.user;
    },

    async register(data: RegisterData): Promise<User> {
        const response = await api.post<AuthResponse>('/users', data);
        return response.data.user;
    },

    async getProfile(): Promise<User> {
        const response = await api.get<User>('/auth/profile');
        return response.data;
    },

    async logout(): Promise<void> {
        await api.post('/auth/logout');
    }
}