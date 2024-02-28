import { IncomingMessage, ServerResponse } from "http";
import prsima from "../prisma";
import createBaseDataObj from "../lib/utilitys/createBaseDataObj";
import writeLogs from "../writeLogs";
import useCors from "../lib/middleware/corsMiddleWare";
import { before } from "node:test";

export default function getBaseUserData(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(
    req,
    res,
    async (req, res) => {
      try {
        if (!req.headers["x-sessionid"]) {
          res.writeHead(422, "err bad data");
          res.end();
          return;
        }
        const session = await prsima.session.findFirst({
          where: {
            id: req.headers["x-sessionid"] as string,
          },
        });

        const user = await prsima.user.findFirst({
          where: {
            id: session.userId,
          },
        });

        const mental_profile = await prsima.mental_profile.findFirst({
          where: {
            id: user.mental_profile,
          },
        });

        const physical_profile = await prsima.physical_profile.findFirst({
          where: {
            id: user.physical_profile,
          },
        });

        const diet_profile = await prsima.diet_profile.findFirst({
          where: {
            id: user.diet_profile,
          },
        });
        const baseData = createBaseDataObj(
          user,
          diet_profile,
          physical_profile,
          mental_profile
        );

        if (!baseData) {
          res.writeHead(422, "err missing data");
          res.end();
          return;
        }

        res.write(JSON.stringify(baseData));
        // res.write("test");
        res.end();
      } catch (error) {
        const e = error as Error;

        writeLogs(e.message);

        res.writeHead(500, "internal server error");
        res.end();
        return;
      }
    },
    ["x-sessionid"]
  );
}
