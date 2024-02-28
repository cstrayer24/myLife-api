import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import prsima from "../prisma";
import writeLogs from "../writeLogs";
import filterGoalProps from "../lib/utilitys/filterGoalProps";

export default function getGoals(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(req, res, async (req, res) => {
    console.log("out of tc block");
    try {
      console.log("inside tc block");

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
      const session = await prsima.session.findFirst({
        where: {
          id: sessionid,
        },
      });

      const goals = await prsima.goal.findMany({
        where: {
          userId: session.userId,
        },
      });
      const filteredGoals = filterGoalProps(goals);
      console.log(filteredGoals);
      res.writeHead(200, "success");
      res.write(JSON.stringify(goals));
      res.end();
      return;
    } catch (e) {
      writeLogs(e.message);
      res.writeHead(500, "internal err");
      res.end();
    }
  });
}
