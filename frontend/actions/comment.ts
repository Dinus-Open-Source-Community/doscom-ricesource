import { Comment } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/komentar`;

export async function getCommentByRiceId(id: string): Promise<Comment[]> {
    const response = await fetch(`${URL}/${id}`);
    const res = await response.json();
    return res.data;
}