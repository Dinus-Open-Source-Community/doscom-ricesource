import { Rice } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/bookmarks`;

export async function getAllBookmarks(token: string): Promise<Rice[]> {
  const res = await axios.get(`${URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
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
