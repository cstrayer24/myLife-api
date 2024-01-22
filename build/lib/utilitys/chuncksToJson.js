"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chuncksToJson(chuncks) {
    var chunckStr = Buffer.concat(chuncks).toString();
    return JSON.parse(chunckStr);
}
exports.default = chuncksToJson;
