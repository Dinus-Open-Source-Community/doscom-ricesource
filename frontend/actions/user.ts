import { User } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export async function getUser(id: string): Promise<User> {
  const response = await axios.get(`${URL}/${id}`);
  return response.data.data;
}
