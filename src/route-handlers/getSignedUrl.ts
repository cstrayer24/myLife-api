import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import chuncksToJson from "../lib/utilitys/chuncksToJson";
import aws from "../aws";

export default function getSignedUrl(
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
        if (req.method != "POST") {
          res.writeHead(422, "err wrong method");
          res.end();
        }

        const data = chuncksToJson(chuncks);
        const url = new URL(
          `https://ml-images.${process.env.CFACCOUNTID}.r2.cloudflarestorage.com`
        );
        url.pathname = data.imgPath;
        console.log(url.toString());
        const signUrl = await aws.sign(new Request(url, { method: "PUT" }), {
          aws: { signQuery: true },
        });
        res.writeHead(200, "success");
        res.write(signUrl.url);
        res.end();
      });
  });
}
