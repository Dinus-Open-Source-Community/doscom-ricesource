
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL; 

export interface adminSetting {
    username: string
    email: string
    password: string
}

export async function updateProfile(data: { username: string; email: string }) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
  
    const response = await axios.put(`${URL}/admins/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }

export async function getProfileData() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const response = await axios.get(`${URL}/admins/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

export async function updatePassword(data: { newPassword: string }) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
  
    const response = await axios.put(`${URL}/admins/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }
  
  
