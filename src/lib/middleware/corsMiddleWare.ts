import { IncomingMessage, ServerResponse } from "http";
function useCors(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  handler: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => any,
  exposedHeaders?: string[],
  origin?: string
) {
  res.setHeader("Access-Control-Allow-Methods", "POST,GET");
  res.setHeader("Access-Control-Expose-Headers", `*`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Methods","true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    `content-type,Accept-Language,Content-Language,Content-Type,${
      exposedHeaders ? exposedHeaders.join() : ""
    }`
  );
  res.setHeader("Access-Control-Allow-Origin", `${origin ? origin : "*"}`);
  if (req.method === "OPTIONS") {
    res.write("preflight");
    res.end();
  } else {
    handler(req, res);
  }
}

export default useCors;
