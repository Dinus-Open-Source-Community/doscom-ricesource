export interface Rice {
    id: number;
    judul: string;
    description: string;
    like: number;
    image_url: string | null;
    github: string | null;
    desktop_environment: string | null;
    windows_manager: string | null;
    distro: string | null;
    terminal: string | null;
    shell: string | null;
    author: string | null;
    user_id: number | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Comment {
    id: number;
    description: string;
    parent_id: number | null;
    id_user: number;
    created_at: string;
    user: {
        avatar: string;
        username: string;
    };
}