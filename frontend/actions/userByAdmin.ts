import axios from "axios"
import type { File } from "buffer"

const URL = process.env.NEXT_PUBLIC_API_URL

export interface UserbyAdmin {
  id: number
  username: string
  email: string
  password: string
  avatar: File | string
}

export async function fetchUserByAdmin(params?: Partial<UserbyAdmin>) {
  const token = localStorage.getItem("token")
  if (!token) {
    console.error("No token found in localStorage")
    throw new Error("Authentication token not found")
  }

  try {
    const response = await axios.get(`${URL}/users`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export async function deleteUserByAdmin(id: number) {
  const token = localStorage.getItem("token")
  if (!token) {
    console.error("No token found in localStorage")
    throw new Error("Authentication token not found")
  }

  // Add validation for ID
  if (!id || id <= 0) {
    console.error("Invalid user ID:", id)
    throw new Error("Invalid user ID provided")
  }

  console.log("Attempting to delete user with ID:", id)
  console.log("Delete URL:", `${URL}/users/${id}`)

  try {
    const response = await axios.delete(`${URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000, // 10 second timeout
    })

    console.log("Delete response:", response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorDetails = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: `${URL}/users/${id}`,
        userId: id,
      }

      console.error("Delete error details:", errorDetails)

      // Handle specific error cases
      if (error.response?.status === 404) {
        throw new Error(`User with ID ${id} not found`)
      } else if (error.response?.status === 403) {
        throw new Error("You do not have permission to delete this user")
      } else if (error.response?.status === 409) {
        throw new Error("Cannot delete user due to existing dependencies")
      } else if (error.response?.status === 500) {
        const serverMessage = error.response?.data?.message || error.response?.data?.error || "Internal server error"
        throw new Error(`Server error: ${serverMessage}`)
      } else if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout - please try again")
      }
    }

    console.error("Error deleting user:", error)
    throw new Error("Failed to delete user - please try again")
  }
}

export async function createUserByAdmin(data: FormData) {
  const token = localStorage.getItem("token")
  if (!token) {
    console.error("No token found in localStorage")
    throw new Error("Authentication token not found")
  }

  try {
    const response = await axios.post(`${URL}/users`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000, // 30 second timeout for file uploads
    })

    console.log("Create user response:", response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.response?.data?.error || "Failed to create user"
      throw new Error(serverMessage)
    }
    console.error("Error creating user:", error)
    throw new Error("Failed to create user - please try again")
  }
}
