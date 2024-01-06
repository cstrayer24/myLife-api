"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function writeLogs(log) {
    if (!(0, fs_1.existsSync)("logs")) {
        (0, fs_1.mkdirSync)("logs");
    }
    (0, fs_1.appendFileSync)("logs/".concat(new Date().toDateString().split(" ").join("_"), ".txt"), log);
}
exports.default = writeLogs;
