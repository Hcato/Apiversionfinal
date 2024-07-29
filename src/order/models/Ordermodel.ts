export interface Order{
    order_id : number;
    user_id : number;
    status : string;
    total : number;
    address : string;
    deleted : boolean;
    created_at : String;
    created_by : string;
    update_at : String;
    update_by : string;
}
export interface OrderProduct {
    product_id: number;
    amount: number;
  }