import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import prsima from "../prisma";
import writeLogs from "../writeLogs";

export default function changeGoalStatus(
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
            res.writeHead(405, "wrong method");
            res.end();
            return;
          }

          const data = chuncksToJson(chuncks);

          const sessionid = req.headers["x-sessionid"] as string;
          if (!sessionid) {
            res.writeHead(403, "not authorized");
            res.end();
            return;
          }

          const session = await prsima.session.findFirst({
            where: {
              id: sessionid,
            },
          });

          const updated = await prsima.goal.update({
            where: {
              id: data.goalId,
              userId: session.userId,
            },
            data: {
              status: data.newVal,
            },
          });

          res.writeHead(200, "success");
          res.end();
        } catch (e) {
          writeLogs(e.message);
          res.writeHead(500, "internal server error");
          res.end();
          return;
        }
      });
  });
}
