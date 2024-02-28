import { product } from "@prisma/client";

type checkoutItem_t = {
  quantity: number;
  itemObj: product;
};

export default checkoutItem_t;
