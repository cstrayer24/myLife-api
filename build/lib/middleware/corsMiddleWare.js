"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useCors(req, res, handler, exposedHeaders, origin) {
    res.setHeader("Access-Control-Allow-Methods", "POST,GET");
    res.setHeader("Access-Control-Expose-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Methods","true");
    res.setHeader("Access-Control-Allow-Headers", "content-type,Accept-Language,Content-Language,Content-Type,".concat(exposedHeaders ? exposedHeaders.join() : ""));
    res.setHeader("Access-Control-Allow-Origin", "".concat(origin ? origin : "*"));
    if (req.method === "OPTIONS") {
        res.write("preflight");
        res.end();
    }
    else {
        handler(req, res);
    }
}
exports.default = useCors;
