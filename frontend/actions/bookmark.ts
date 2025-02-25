import { Bookmark, Rice } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/bookmarks`;

export async function getAllBookmarks(token: string): Promise<Bookmark[]> {
  try {
    const response = await axios.get(`${URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized");
      }
    }
    console.error("Error fetching bookmarks:", error);
    throw new Error("Failed to fetch bookmarks");
  }
}
export async function bookmarkConfig(id: string, token: string): Promise<void> {
  await axios.post(
    `${URL}`,
    {
      config_id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
