import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import writeLogs from "../writeLogs";
import prsima from "../prisma";

export default function makePath(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  const chuncks = [];

  req
    .on("data", (c) => {
      chuncks.push(c);
    })
    .on("end", () => {
      useCors(req, res, async (req, res) => {
        try {
          if (req.method !== "POST") {
            res.writeHead(405, "wrong method");
            res.end();
            return;
          }

          const sessionid = req.headers["x-sessionid"] as string;
          if (!sessionid) {
            res.writeHead(403, "unauthorized");
            res.end();
          }

          const data = chuncksToJson(chuncks);
          console.log(data);
          const newPath = await prsima.path.create({
            data: {
              description: data.description,
              name: data.pathName,
              thumbnail: `${process.env.IMGURL}/${data.fname}`,
              keywords: data.keywordList,
            },
          });
          res.writeHead(200, "success");
          res.write(JSON.stringify({ newPathid: newPath.id }));

          res.end();
        } catch (e) {
          writeLogs(e.message);
          res.writeHead(500, "internal server error");
          res.end();
        }
      });
    });
}
