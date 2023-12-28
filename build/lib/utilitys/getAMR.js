"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAMR(BMR, activeness) {
    var activenessResolves = new Map([
        ["Sedentary", 1.2],
        ["Lightly_active", 1.375],
        ["Moderately_active", 1.55],
        ["active", 1.752]
    ]);
    return BMR * activenessResolves.get(activeness);
}
exports.default = getAMR;
