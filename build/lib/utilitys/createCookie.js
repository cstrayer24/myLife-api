"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCookie = function (key, value, path, httpOnly, expiresAt, SameSite, secure) {
    return "".concat(key, "=").concat(value, ";").concat(path ? "path=".concat(path, ";") : "").concat(httpOnly ? "httpOnly;" : "").concat(expiresAt ? "Expires=".concat(expiresAt.toUTCString(), ";") : "").concat(secure ? "Secure;" : "").concat(SameSite ? "SameSite=".concat(SameSite) : "");
};
exports.default = createCookie;
