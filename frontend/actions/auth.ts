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
    avatar : string;
}

export async function login(data: loginProps) {
    const response = await axios.post(`${URL}/login`, data);
    return response.data;
}

