import { orderProd } from "../models/orderProd";
export interface Order {
  quantity: number,
  product: string,
  brandName: string
}