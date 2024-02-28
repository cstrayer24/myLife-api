import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import prsima from "../prisma";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
export default function removeCartItem(
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
        if (req.method !== "PATCH") {
          res.writeHead(405, "wrong method");
          res.end();
        }

        const sessionid = req.headers["x-sessionid"] as string;

        if (!sessionid) {
          res.writeHead(403, "unauthorized");
          res.end();
        }

        const user = await getUserFromSessionid(sessionid);

        const cart = await prsima.cart.findFirst({
          where: {
            userId: user.id,
          },
        });

        const data = chuncksToJson(chuncks);
        const itemToDelete = await prsima.product.findFirst({
          where: { id: data.itemid },
        });

        cart.items.splice(cart.items.indexOf(data.itemid));

        await prsima.cart.update({
          where: {
            id: user.cartid,
          },
          data: {
            total: cart.total - itemToDelete.price,
            items: cart.items,
          },
        });
        res.writeHead(200, "success");
        res.end();
      });
  });
}
