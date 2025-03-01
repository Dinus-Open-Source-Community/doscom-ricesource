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
    const response = await axios.post(`${URL}/login`, data);
    const cookieStore = await cookies();

    // Set the cookie correctly
    cookieStore.set("token", response.data.token, {
        httpOnly: true,
        maxAge: 86400, // 1 day
        path: "/",
    });

    return response.data;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}
