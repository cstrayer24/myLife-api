import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import writeLogs from "../writeLogs";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import prsima from "../prisma";
import buildCartItems from "../lib/utilitys/buildCartItems";
import { it } from "node:test";

export default function getCartItems(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(req, res, async (req, res) => {
    try {
      if (req.method !== "GET") {
        res.writeHead(405, "wrong method");
        res.end();

        return;
      }

      const sessionid = req.headers["x-sessionid"];

      if (!sessionid) {
        res.writeHead(403, "not authorized");
        res.end();
        return;
      }

      const user = await getUserFromSessionid(sessionid as string);
      const items = await prsima.product.findMany();

      const cart = await prsima.cart.findFirst({ where: { id: user.cartid } });
      const itemsObj = await buildCartItems(items, cart.items, cart.total);
      res.writeHead(200, "success");
      res.write(JSON.stringify(itemsObj));
      res.end();
    } catch (e) {
      writeLogs(e.message);
      res.writeHead(500, "internal server error");
      res.end();
    }
  });
}
