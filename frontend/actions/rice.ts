import { Rice } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/configs`;

export async function getAllRices(): Promise<Rice[]> {
    const allRice = await fetch(`${URL}`);
    const res = await allRice.json();
    return res.data;
}

export async function getRiceById(id: string): Promise<Rice> {
    const allRice = await fetch(`${URL}/${id}`);
    const res = await allRice.json();
    return res.data;
}
