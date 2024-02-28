import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import aws from "../aws";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import prsima from "../prisma";
import writeLogs from "../writeLogs";
import { randomUUID } from "crypto";

export default function setPfpUrl(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  console.log("outside");
  useCors(
    req,
    res,
    (req, res) => {
      const chuncks = [];

      req
        .on("data", (c) => {
          chuncks.push(c);
        })
        .on("end", async () => {
          try {
            if (req.method !== "POST") {
              res.writeHead(405, "wrong method");
              res.end();
              return;
            }
            const data = chuncksToJson(chuncks);

            const sessionid = req.headers["x-sessionid"] as string;
            if (!sessionid) {
              res.writeHead(403, "unauthorized");
              res.end();
            }
            if (!data.fname) {
              res.writeHead(422, "no filename");
              res.end();
            }
            console.log();
            const session = await prsima.session.findFirst({
              where: {
                id: sessionid,
              },
            });
            console.log(session);
            const pfpUrl = `${process.env.IMGSDOMAIN}/${data.fname}`;
            const user = await prsima.user.update({
              where: {
                id: session.userId,
              },
              data: {
                pfp: pfpUrl,
              },
            });

            if (user) {
              res.writeHead(200, "success");
              res.write(JSON.stringify({ pfp: pfpUrl }));
              res.end();
            }
          } catch (error) {
            writeLogs(error.message);
            res.writeHead(500, "internal server error");
            res.end();
          }
        });
    },
    ["x-sessionid"]
  );
}
