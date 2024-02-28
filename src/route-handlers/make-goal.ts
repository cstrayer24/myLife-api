import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import prsima from "../prisma";
import getCurrentDateYYYYDDMM from "../lib/utilitys/getCurrentDateYYYYDDMM";

export default function makeGoal(
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
          if (req.method !== "POST") {
            res.writeHead(405, "wrong method");
            res.end();
            return;
          }

          const reqData = chuncksToJson(chuncks);
          const sessionid = req.headers["x-sessionid"];
          if (!sessionid) {
            res.writeHead(403, "not authorized");
            res.end();
            return;
          }

          const session = await prsima.session.findFirst({
            where: {
              id: sessionid as string,
            },
          });

          const data = {
            userId: session.userId,
            startTime: getCurrentDateYYYYDDMM(),
            ...reqData,
          };
          //data obj works although make sure to change nmae of 'time-urgency'
          console.log(data);

          const newGoal = await prsima.goal.create({
            data,
          });

          res.writeHead(200, "success");
          res.end();
        } catch (error) {
          console.log(error.message);
          res.writeHead(500, "err");
          res.end();
        }
      });
  });
}
