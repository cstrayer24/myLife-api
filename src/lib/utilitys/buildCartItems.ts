import { Prisma, product } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import prsima from "../../prisma";

export default async function buildCartItems(
  products: product[],
  cartItems: string[],
  price: number
) {
  const obj = {
    total: price,
    items: [],
  };

  const foundItems = new Map();
  const avail = products.map((v) => v.id);
  const filterdItems = cartItems.filter((v) => avail.includes(v));

  for (let i = 0; i < filterdItems.length; i++) {
    if (!foundItems.has(filterdItems[i])) {
      const prod = await prsima.product.findFirst({
        where: {
          id: filterdItems[i],
        },
      });
      foundItems.set(filterdItems[i], prod);
      obj.items.push(prod);
    } else {
      obj.items.push(foundItems.get(filterdItems[i]));
    }
  }

  return obj;
}
