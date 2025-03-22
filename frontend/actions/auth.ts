"use server"
import { cookies } from 'next/headers'
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/userauth`;

interface loginProps {
    email: string;
    password: string;
}

interface registerProps {
    username: string;
    email: string;
    password: string;
    avatar: string;
}

export async function login(data: loginProps) {
    try {
        const response = await axios.post(`${URL}/login`, data);

        // Set the cookie correctly
        const cookieStore = await cookies();
        cookieStore.set("token", response.data.token, {
            httpOnly: true,
            maxAge: 86400, // 1 day
            path: "/",
        });

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Login error:", error);

        // Handle Axios errors
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }

        // Handle generic errors
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function register(data: registerProps) {
    try {
        const response = await axios.post(`${URL}/register`, data);

        // Set the cookie correctly after registration (optional)
        const cookieStore = await cookies();
        cookieStore.set("token", response.data.token, {
            httpOnly: true,
            maxAge: 86400, // 1 day
            path: "/",
        });

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Registration error:", error);

        // Handle Axios errors
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed",
            };
        }

        // Handle generic errors
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}
