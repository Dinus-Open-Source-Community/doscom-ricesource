import { Comment } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/komentar`;

interface postCommentProps {
    config_id: number;
    description: string;
    id_user: number;
    token: string;
}

interface replyCommentProps {
    config_id: number;
    description: string;
    id_user: number;
    parent_id: number;
    token: string;
}

export async function getCommentByRiceId(id: string): Promise<Comment[]> {
    const response = await fetch(`${URL}/${id}`);
    const res = await response.json();
    return res.data;
}

export async function postComment(comment: postCommentProps): Promise<Comment> {
    const reponse = await axios.post(URL, comment, {
        headers: {
            Authorization: `Bearer ${comment.token}`,
        },
    });
    return reponse.data;
}

export async function replyComment(comment: replyCommentProps): Promise<Comment> {
    const response = await axios.post(URL, comment, {
        headers: {
            Authorization: `Bearer ${comment.token}`,
        },
    });
    return response.data;
}