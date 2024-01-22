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
var corsMiddleWare_1 = require("../../lib/middleware/corsMiddleWare");
var getBMIFreedomUnits_1 = require("../../lib/utilitys/getBMIFreedomUnits");
var prisma_1 = require("../../prisma");
var unitConversions_1 = require("../../lib/utilitys/unitConversions");
var getBMR_1 = require("../../lib/utilitys/getBMR");
var getAMR_1 = require("../../lib/utilitys/getAMR");
function step3(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (0, corsMiddleWare_1.default)(req, res, function (req, res) {
                var chunks = [];
                var success = true;
                req
                    .on("data", function (chunk) {
                    chunks.push(chunk);
                })
                    .on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                    var bodyStr, bodyObj, currentUser, heightVals, height_inches, i, bmi, weightKg, heightCm, BMR, AMR, prof, current_user_diet_prof, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (req.method !== "POST") {
                                    success = false;
                                    res.writeHead(405, "wrong method");
                                    res.write("");
                                    res.end();
                                    return [2 /*return*/];
                                }
                                bodyStr = Buffer.concat(chunks).toString();
                                bodyObj = JSON.parse(bodyStr);
                                console.log(bodyObj);
                                return [4 /*yield*/, prisma_1.default.user.findFirst({
                                        where: {
                                            id: bodyObj.userID,
                                        },
                                    })];
                            case 1:
                                currentUser = _a.sent();
                                heightVals = bodyObj.height.split(",");
                                height_inches = 0;
                                for (i = 0; i < parseInt(heightVals[0]); i++) {
                                    height_inches += 12;
                                }
                                height_inches += parseInt(heightVals[1]);
                                bmi = (0, getBMIFreedomUnits_1.default)(parseInt(bodyObj.weight), height_inches);
                                weightKg = (0, unitConversions_1.poundToKg)(parseInt(bodyObj.weight));
                                heightCm = (0, unitConversions_1.inchTocm)(height_inches);
                                BMR = (0, getBMR_1.default)(currentUser.sex, weightKg, heightCm, currentUser.age);
                                AMR = (0, getAMR_1.default)(BMR, bodyObj.workout_frequency);
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 7, , 8]);
                                return [4 /*yield*/, prisma_1.default.physical_profile.create({
                                        data: {
                                            useriD: bodyObj.userID,
                                            weight: parseInt(bodyObj.weight),
                                            height_str: bodyObj.height,
                                            height_inches: height_inches,
                                            hasDisabilities: bodyObj.hasDisabilities == "true",
                                            disabilites: Array.from(bodyObj.disabilities),
                                            strength: parseInt(bodyObj.strength),
                                            endurance: parseInt(bodyObj.endurance),
                                            bmi: bmi,
                                        },
                                    })];
                            case 3:
                                prof = _a.sent();
                                return [4 /*yield*/, prisma_1.default.diet_profile.findFirst({
                                        where: { userId: bodyObj.userID },
                                    })];
                            case 4:
                                current_user_diet_prof = _a.sent();
                                return [4 /*yield*/, prisma_1.default.diet_profile.update({
                                        where: {
                                            id: current_user_diet_prof.id,
                                        },
                                        data: {
                                            BMR: BMR,
                                            AMR: AMR,
                                        },
                                    })];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, prisma_1.default.user.update({
                                        where: {
                                            id: currentUser.id,
                                        },
                                        data: {
                                            physical_profile: prof.id,
                                        },
                                    })];
                            case 6:
                                _a.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                e_1 = _a.sent();
                                console.log(e_1);
                                success = false;
                                res.writeHead(500, "err creating user");
                                res.write("");
                                res.end();
                                return [3 /*break*/, 8];
                            case 8:
                                if (success) {
                                    res.writeHead(200, "success");
                                    res.write("");
                                    res.end();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            return [2 /*return*/];
        });
    });
}
exports.default = step3;
