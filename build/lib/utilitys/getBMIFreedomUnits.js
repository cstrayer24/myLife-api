"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBMIFreedomUnits(weight, height) {
    var CONVERSION_RATE = 703;
    return (CONVERSION_RATE * (weight / Math.pow(height, 2)));
}
exports.default = getBMIFreedomUnits;
