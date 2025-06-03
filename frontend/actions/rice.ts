import { ApiResponse, Rice } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/configs`;

async function handleResponse(response: Response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
        );
    }
    const data = await response.json();
    return data.data || data; // Return data or the entire response if no data property
}

export async function getAllRices(): Promise<Rice[]> {
    try {
        const response = await fetch(URL);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching all rice configs:", error);
        throw error;
    }
}

export async function getTopRices(): Promise<Rice[]> {
    try {
        const response = await fetch(`${URL}/top`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching top rice configs:", error);
        throw error;
    }
}

export async function getRiceById(id: string): Promise<Rice> {
    try {
        const response = await fetch(`${URL}/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching rice config with ID ${id}:`, error);
        throw error;
    }
}

export async function getRiceByUserId(userId: string): Promise<Rice[]> {
    try {
        const response = await fetch(`${URL}/user/${userId}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching rice configs for user ID ${userId}:`, error);
        throw error;
    }
}

export async function createRice(formData: FormData, token: string): Promise<ApiResponse<Rice>> {
    try {
        const response = await axios.post<ApiResponse<Rice>>(
            URL,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Error in createRice:", error);
        return {
            success: false,
            message: error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred"
        };
    }
}

export async function updateRice(
    riceId: string,
    formData: FormData,
    token: string
): Promise<ApiResponse<Rice>> {
    try {
        const response = await axios.put(`${URL}/${riceId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error: any) {
        console.error("Update error:", error)
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Update failed"
        }
    }
}

export async function deleteRice(id: string, token: string): Promise<void> {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        await handleResponse(response);
    } catch (error) {
        console.error(`Error deleting rice config with ID ${id}:`, error);
        throw error;
    }
}