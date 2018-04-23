import { orderProd } from "../models/orderProd";
export interface Order {
  _id: string,
  quantity: number,
  product: orderProd,
  brandName: string
}