"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setObj_1 = require("./setObj");
function createBaseDataObj(user, diet, physical, mental) {
    //filter the rest of the keys
    var userKeys = Object.keys(user).filter(function (v) {
        return ![
            "diet_profile",
            "mental_profile",
            "physical_profile",
            "password",
        ].includes(v) && !v.includes("id");
    });
    var dietKeys = Object.keys(diet).filter(function (v) { return !["id", "userId", "userID"].includes(v); });
    var physicalKeys = Object.keys(physical).filter(function (v) { return !["id", "userId", "useriD"].includes(v); });
    var mentalKeys = Object.keys(mental).filter(function (v) { return !["id", "userid", "userID"].includes(v); });
    var data = {
        info: (0, setObj_1.default)(userKeys, user),
        physical: (0, setObj_1.default)(physicalKeys, physical),
        diet: (0, setObj_1.default)(dietKeys, diet),
        mental: (0, setObj_1.default)(mentalKeys, mental),
    };
    return data;
}
exports.default = createBaseDataObj;
