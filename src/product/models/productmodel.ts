export interface Product{
    product_id: number;
    category_id_fk: number;
    color_id_fk : number;
    size_id_fk: number;
    name: string;
    description: string;
    url: string;
    price: string;
    total_amount: number;
    deleted: boolean;
    created_at: String;
    created_by: string;
    update_at: String;
    update_by: string;
}