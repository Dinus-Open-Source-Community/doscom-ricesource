import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface adminLoginProbs {
    email : string;
    password : string;
}

interface adminRegisterProbs {
    username: String;
    email: string;
    password: String;
    token: String;
}

export interface Admin {
    id: number;
    email: string;
    username: string;
}
export async function adminLogin(data:adminLoginProbs) {
    const response = await axios.post(`${URL}/auth/login`, data);
    return response.data
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



