import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import makeCart from "../lib/utilitys/makeCart";
import prsima from "../prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import writeLogs from "../writeLogs";

export default async function addToCart(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(req, res, (req, res) => {
    const chuncks = [];

    req
      .on("data", (c) => {
        chuncks.push(c);
      })
      .on("end", async () => {
        try {
          if (req.method !== "PUT") {
            res.writeHead(405, "err wrong method");
            res.end();
            return;
          }

          const data = chuncksToJson(chuncks);

          const sessionid = req.headers["x-sessionid"];
          if (!sessionid) {
            res.writeHead(403, "unauthorized");
            res.end();
            return;
          }

          const user = await getUserFromSessionid(sessionid as string);
          let cart;
          if (!user.cartid) {
            //make cart
            cart = makeCart(user.id);
          } else {
            cart = await prsima.cart.findFirst({ where: { id: user.cartid } });
          }

          const addedItem = await prsima.product.findFirst({
            where: {
              id: data.itemid,
            },
          });

          await prsima.cart.update({
            where: {
              id: cart.id,
            },
            data: {
              total: cart.total + addedItem.price,
              items: cart.items.concat(data.itemid),
            },
          });
          console.log(cart.items);
          res.writeHead(200);
          res.end();
        } catch (e) {
          console.log(e.message);
          writeLogs(e.message);
          res.writeHead(500, "internal server error");
          res.end();
        }
      });
  });
}
