import prsima from "../../prisma";

export default async function makeCart(userId: string) {
  const cart = await prsima.cart.create({
    data: {
      userId,
      total: 0,
      items: [],
    },
  });

  await prsima.user.update({
    where: {
      id: userId,
    },
    data: {
      cartid: cart.id,
    },
  });

  return cart;
}
