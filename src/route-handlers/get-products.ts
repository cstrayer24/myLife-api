import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import prsima from "../prisma";
import writeLogs from "../writeLogs";

export default function getProducts(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(req, res, async (req, res) => {
    try {
      if (req.method !== "GET") {
        res.writeHead(405, "wrong ,method");
        res.end();
        return;
      }

      const sessionid = req.headers["x-sessionid"];

      if (!sessionid) {
        res.writeHead(403, "not authorized");
        res.end();
        return;
      }

      const products = await prsima.product.findMany();

      res.writeHead(200, "success");
      res.write(JSON.stringify(products));
      res.end();
    } catch (e) {
      console.log(e);
      writeLogs(e.message);
      res.writeHead(500, "internal error");
      res.end();
    }
  });
}
