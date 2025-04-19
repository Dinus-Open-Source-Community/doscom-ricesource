import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Fallback for development

interface adminLoginProbs {
    email : string;
    password : string;
}

export interface adminRegisterProbs {
    username: string;
    email: string;
    password: string;
    token: string;
}

export interface Admin {
    id: number;
    email: string;
    username: string;
    password: string;
}
export async function adminLogin(data:adminLoginProbs) {
    const response = await axios.post(`${URL}/auth/login`, data);
    return response.data
}

export async function adminRegister(data: adminRegisterProbs) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        throw new Error('Unauthorized: No token found');
    }
    const response = await axios.post(`${URL}/admins`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function fetchAdminData(params?: Partial<Admin>) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.get(`${URL}/admins`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data)
    return response.data
}

export async function deleteAdmin(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.delete(`${URL}/admins/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}








