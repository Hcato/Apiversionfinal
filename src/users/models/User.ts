export interface User{
    user_id: number;
    rol_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    deleted: boolean;
    created_at: String;
    created_by: string;
    update_at: String;
    update_by: string;
}