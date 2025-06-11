import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/config`;

export async function likeConfig(id: string, token: string): Promise<void> {
    await axios.post(`${URL}/${id}/like`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}