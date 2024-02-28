import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import writeLogs from "../writeLogs";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import prsima from "../prisma";

export default function clearCart(
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

      const sessionid = req.headers["x-sessionid"] as string;

      if (!sessionid) {
        res.writeHead(403, "unauthorized");
        res.end();
        return;
      }

      const user = await getUserFromSessionid(sessionid);

      await prsima.cart.update({
        where: {
          id: user.cartid,
        },
        data: {
          items: [],
          total: 0,
        },
      });
      console.log("right here");
      res.writeHead(200, "success");
      res.end();
      return;
    } catch (error) {
      writeLogs(error.message);
      res.writeHead(500, "internal server error");
      res.end();
    }
  });
}
