import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import getUserFromSessionid from "../lib/utilitys/getUserFromSessionid";
import prsima from "../prisma";
import { Prisma } from "@prisma/client";
import writeLogs from "../writeLogs";

export default function setUserSetting(
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
          if (req.method !== "PATCH") {
            res.writeHead(405, "wrong method");
            res.end();
            return;
          }

          const sessionid = req.headers["x-sessionid"] as string;

          if (!sessionid) {
            res.writeHead(403, "not authorized");
            res.end();
            return;
          }

          const data = chuncksToJson(chuncks);
          const session = await prsima.session.findFirst({
            where: {
              id: sessionid,
            },
          });
          const newData = data.thingsToChange;
          await prsima.user.update({
            where: {
              id: session.userId,
            },
            data: newData,
          });
          console.log("test");
          res.writeHead(200, "success");
          res.end();
          return;
        } catch (error) {
          writeLogs(error.message);
          console.log(error.message);
          res.writeHead(500, "internal server error");
          res.end();
        }
      });
  });
}
