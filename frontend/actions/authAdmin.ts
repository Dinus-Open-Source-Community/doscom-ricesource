import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/userauth`;

interface adminLoginProbs {
    email : string;
    password : string;
}

export async function adminLogin(data:adminLoginProbs) {
    const response = await axios.post(`${URL}/login`, data);
    return response.data
}