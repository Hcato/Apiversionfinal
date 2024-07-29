import { Product } from "../../product/models/productmodel";
export interface OrderWithProducts {
    order_id: number;
  user_id_fk: number;
  status: string;
  total: number;
  products: Product[];
  }
  