import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL; 

export interface Config {
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

export async function fetchConfigData(params?: Partial<Config>) {
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