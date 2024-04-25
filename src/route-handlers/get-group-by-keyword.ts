import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import prsima from "../prisma";
import writeLogs from "../writeLogs";

export default function getGroupByKeyword(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(req, res, (req, res) => {
    const chunks = [];

    req
      .on("data", (c) => {
        chunks.push(c);
      })
      .on("end", async () => {
        try {
          console.log("in api");
          if (req.method !== "POST") {
            res.writeHead(405, "Wrong Method");
            res.end();
            return;
          }

          const sessionid = req.headers["x-sessionid"];

          if (!sessionid) {
            res.writeHead(403, "unauthorized");
            res.end();
            return;
          }

          const data = chuncksToJson(chunks);
          let resBod = [];
          const groups = await prsima.group.findMany();

          for (let i = 0; i < data.keywords.length; i++) {
            groups.forEach((v) => {
              if (v.associatedKeywords.includes(data.keywords[i])) {
                resBod.push(v);
                console.log("hi");
              }
            });
          }

          res.writeHead(200, "success");
          res.write(JSON.stringify(resBod));
          res.end();
          return;
        } catch (e) {
          writeLogs(e.message);
          res.writeHead(500, "internal error");
          res.end();
        }
      });
  });
}
