import prsima from "../../prisma";
import checkoutItem_t from "../types/checkoutItem_t";

export default async function makeCheckoutItems(data: any[]) {
  const items: checkoutItem_t[] = await Promise.all(
    data.map(async (v) => {
      const itemobj = await prsima.product.findFirst({
        where: {
          id: v.itemid,
        },
      });

      return { quantity: v.quantity, itemObj: itemobj };
    })
  );
  return items;
}
