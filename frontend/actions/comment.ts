import { Comment } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/komentar`;

interface PostCommentProps {
    config_id: number;
    description: string;
    id_user: number;
    token: string;
}

interface ReplyCommentProps {
    config_id: number;
    description: string;
    id_user: number;
    parent_id: number;
    token: string;
}

/**
 * Mengambil komentar berdasarkan ID (riceId).
 */
export async function getCommentByRiceId(id: string): Promise<Comment[]> {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to fetch comments");
    }
}

/**
 * Memposting komentar baru.
 */
export async function postComment(comment: PostCommentProps): Promise<Comment> {
    try {
        const response = await axios.post(URL, comment, {
            headers: {
                Authorization: `Bearer ${comment.token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Tangani error 401
            if (error.response?.status === 401) {
                throw new Error("Unauthorized");
            }
        }
        console.error("Error posting comment:", error);
        throw new Error("Failed to post comment");
    }
}


/**
 * Membalas komentar.
 */
export async function replyComment(comment: ReplyCommentProps): Promise<Comment> {
    try {
        const response = await axios.post(URL, comment, {
            headers: {
                Authorization: `Bearer ${comment.token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Tangani error 401
            if (error.response?.status === 401) {
                throw new Error("Unauthorized");
            }
        }
        console.error("Error replying to comment:", error);
        throw new Error("Failed to reply to comment");
    }
}