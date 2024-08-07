import { CartItem } from "@/model/userModel";

export interface Apiresponse {
  success: boolean;
  message: string;
  cartItem?: Array<CartItem>;
  hasOrdered?: boolean;
}
