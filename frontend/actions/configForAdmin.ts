import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL; 

export interface ConfigForAdmin {
    id: number;
    judul: string;
    description: string;
    like: number;
    image_url: string;
    github: string;
    desktop_environment: string;
    widowss_manager: string;
    distro: string;
    terminal: string;
    shell: string;
    author: string;
}

export async function fetchConfigForAdmin(params?: Partial<ConfigForAdmin>) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.get(`${URL}/configs`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data)
    return response.data
}

export async function storeConfigForAdmin(data: ConfigForAdmin) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.post(`${URL}/configs`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}

export async function updateConfigForAdmin(id: number, data: ConfigForAdmin) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.put(`${URL}/configs/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}
export async function deleteConfigForAdmin(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const response = await axios.delete(`${URL}/configs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}