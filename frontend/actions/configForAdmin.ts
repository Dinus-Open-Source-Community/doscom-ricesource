const URL = process.env.NEXT_PUBLIC_API_URL

export interface ConfigForAdmin {
  id: number
  judul: string
  description: string
  like: number
  image_url: string
  github: string
  desktop_environment: string
  windows_manager: string
  distro: string
  terminal: string
  shell: string
  author: string
}

export interface Config {
  id: number
  judul: string
  description: string
  like: number
  images: File | string
  github: string
  desktop_environment: string
  windows_manager: string
  distro: string
  terminal: string
  shell: string
  author: string
}

export interface CreateConfigData {
  judul: string
  description: string
  images: File
  github: string
  desktop_environment: string
  windows_manager: string
  distro: string
  terminal: string
  shell: string
}

export async function fetchConfigForAdmin(params?: Partial<ConfigForAdmin>) {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Authentication token not found")
  }

  const response = await fetch(`${URL}/configs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch configs")
  }

  return response.json()
}

export async function storeConfigForAdmin(data: CreateConfigData) {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Authentication token not found")
  }

  const formData = new FormData()

  // Add text fields
  formData.append("judul", data.judul.trim())
  formData.append("description", data.description.trim())
  formData.append("github", data.github.trim())
  formData.append("desktop_environment", data.desktop_environment.trim())
  formData.append("windows_manager", data.windows_manager.trim())
  formData.append("distro", data.distro.trim())
  formData.append("terminal", data.terminal.trim())
  formData.append("shell", data.shell.trim())
  formData.append("like", "0")

  // Add file
  if (data.images instanceof File) {
    formData.append("images", data.images, data.images.name)
  } else {
    throw new Error("Images must be a File object")
  }

  const response = await fetch(`${URL}/configs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to store config")
  }

  return responseData
}

export async function updateConfigForAdmin(id: number, data: Config) {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Authentication token not found")
  }

  const formData = new FormData()

  formData.append("judul", data.judul)
  formData.append("description", data.description)
  formData.append("like", data.like.toString())
  formData.append("github", data.github)
  formData.append("desktop_environment", data.desktop_environment)
  formData.append("windows_manager", data.windows_manager)
  formData.append("distro", data.distro)
  formData.append("terminal", data.terminal)
  formData.append("shell", data.shell)
  formData.append("author", data.author)

  if (data.images instanceof File) {
    formData.append("images", data.images, data.images.name)
  } else {
    formData.append("images", data.images)
  }

  const response = await fetch(`${URL}/configs/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to update config")
  }

  return responseData
}

export async function deleteConfigForAdmin(id: number) {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Authentication token not found")
  }

  const response = await fetch(`${URL}/configs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to delete config")
  }

  return responseData
}
