"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setObj(keys, baseobj) {
    var userObj = {};
    for (var i = 0; i < keys.length; i++) {
        var current = keys[i];
        userObj[current] = baseobj[current];
    }
    return userObj;
}
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
        info: setObj(userKeys, user),
        physical: setObj(physicalKeys, physical),
        diet: setObj(dietKeys, diet),
        mental: setObj(mentalKeys, mental),
    };
    return data;
}
exports.default = createBaseDataObj;
