import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL; 

export interface UserbyAdmin {
    id: number;
    username: string;
    email: string;
    password: string;
    avatar: string;
  }


export async function fetchUserByAdmin(params?: Partial<UserbyAdmin>) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.get(`${URL}/users`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data
}

export async function deleteUserByAdmin(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.delete(`${URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}

export async function createUserByAdmin(data: UserbyAdmin) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.post(`${URL}/users`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}