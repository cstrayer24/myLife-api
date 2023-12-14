"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useCors(req, res, handler) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', "POST");
    if (req.method === "OPTIONS") {
        res.end();
    }
    else {
        handler(req, res);
    }
}
exports.default = useCors;
