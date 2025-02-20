import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

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

export async function adminLogin(data:adminLoginProbs) {
    const response = await axios.post(`${URL}/login`, data);
    return response.data
}

export async function creaAdminLogin(data:adminRegisterProbs) {
    const response = await axios.post(`${URL}/login`, data, {headers:{
        Authorization: `${data.token}`
    }});
    return response.data
}
