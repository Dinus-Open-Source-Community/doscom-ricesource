export interface Rice {
    id: number;
    judul: string;
    description: string;
    like: number;
    image_url: string | null;
    github: string | null;
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