"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var dotenv_1 = require("dotenv");
var make_letter_reciver_1 = require("./route-handlers/make-letter-reciver");
var step1_1 = require("./route-handlers/registration/step1");
var step2_1 = require("./route-handlers/registration/step2");
(0, dotenv_1.config)();
var server = (0, http_1.createServer)(function (req, res) {
    switch (req.url) {
        case "/test":
            res.write("hi");
            res.end();
            break;
        case "/newsletter/signup":
            (0, make_letter_reciver_1.default)(req, res);
            break;
        case "/registration-step1":
            (0, step1_1.default)(req, res);
            break;
        case "/registration-step2":
            (0, step2_1.default)(req, res);
            break;
    }
});
console.log("running on ".concat(process.env.PORT));
server.listen(parseInt(process.env.PORT));
