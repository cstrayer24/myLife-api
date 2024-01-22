import { IncomingMessage, ServerResponse } from "http";
import * as argon2 from "argon2";

import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import prsima from "../prisma";
import createSession from "../lib/utilitys/createSession";
import createCookie from "../lib/utilitys/createCookie";
export default function login(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  useCors(
    req,
    res,
    (req, res) => {
      const chuncks = [];
      const success = true;
      req
        .on("data", (chunck) => {
          chuncks.push(chunck);
        })
        .on("end", async () => {
          if (req.method !== "POST") {
            res.writeHead(422, "wrong method");
            res.end();
            return;
          }

          const bodyObj = chuncksToJson(chuncks);
          const current_user = await prsima.user.findFirst({
            where: {
              email: bodyObj.mail,
            },
          });
          console.log(current_user);
          if (!(await argon2.verify(current_user.password, bodyObj.password))) {
            res.writeHead(400, "wrong passwd");
            res.end();
            return;
          }

          try {
            const session = await createSession(current_user.id);
            if (session) {
              const cookie = createCookie(
                "sessionid",
                session.id,
                "/",
                true,
                new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                "None",
                true
              );

              res.setHeader("Set-Cookie", cookie);
              res.writeHead(200, "logged in");
              res.write(JSON.stringify({ sessionid: session.id }));
              res.end();
            }
          } catch (error) {
            res.writeHead(500, "failed to create session");
            res.end();
          }
        });
    },
    ["content-type"],
    "http://127.0.0.1:5501"
  );
}
