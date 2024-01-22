"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCookie_1 = require("./createCookie");
var createSessionCookie = function (id) {
    return (0, createCookie_1.default)("sessionid", id, "/", true, new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), "None", true);
};
exports.default = createSessionCookie;
