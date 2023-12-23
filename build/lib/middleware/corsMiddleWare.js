"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useCors(req, res, handler, exposedHeaders) {
    res.setHeader('Access-Control-Allow-Methods', "POST,GET");
    res.setHeader("Access-Control-Expose-Headers", "*");
    // res.setHeader("Access-Control-Allow-Methods","true");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.write("preflight");
        res.end();
    }
    else {
        handler(req, res);
    }
}
exports.default = useCors;
