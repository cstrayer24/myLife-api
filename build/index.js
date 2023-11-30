"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var server = (0, http_1.createServer)(function (req, res) {
    switch (req.url) {
        case "/test":
            res.write("hi");
            res.end();
            break;
    }
});
server.listen(3000);
