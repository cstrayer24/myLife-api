"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var argon2 = require("argon2");
var corsMiddleWare_1 = require("../lib/middleware/corsMiddleWare");
var chuncksToJson_1 = require("../lib/utilitys/chuncksToJson");
var prisma_1 = require("../prisma");
var createSession_1 = require("../lib/utilitys/createSession");
var createCookie_1 = require("../lib/utilitys/createCookie");
function login(req, res) {
    var _this = this;
    (0, corsMiddleWare_1.default)(req, res, function (req, res) {
        var chuncks = [];
        var success = true;
        req
            .on("data", function (chunck) {
            chuncks.push(chunck);
        })
            .on("end", function () { return __awaiter(_this, void 0, void 0, function () {
            var bodyObj, current_user, session, cookie, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.method !== "POST") {
                            res.writeHead(422, "wrong method");
                            res.end();
                            return [2 /*return*/];
                        }
                        bodyObj = (0, chuncksToJson_1.default)(chuncks);
                        console.log(bodyObj);
                        return [4 /*yield*/, prisma_1.default.user.findFirst({
                                where: {
                                    email: bodyObj.mail,
                                },
                            })];
                    case 1:
                        current_user = _a.sent();
                        if (!current_user) {
                            res.writeHead(400, "not authorized");
                            res.end();
                        }
                        return [4 /*yield*/, argon2.verify(current_user.password, bodyObj.password)];
                    case 2:
                        if (!(_a.sent())) {
                            res.writeHead(400, "wrong passwd");
                            res.end();
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, (0, createSession_1.default)(current_user.id)];
                    case 4:
                        session = _a.sent();
                        if (session) {
                            cookie = (0, createCookie_1.default)("sessionid", session.id, "/", true, new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), "None", true);
                            res.setHeader("Set-Cookie", cookie);
                            res.writeHead(200, "logged in");
                            res.write(JSON.stringify({ sessionid: session.id }));
                            res.end();
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        res.writeHead(500, "failed to create session");
                        res.end();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    }, ["content-type"], process.env.LANDINGURL);
}
exports.default = login;
