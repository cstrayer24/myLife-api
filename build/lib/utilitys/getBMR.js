"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBMR(sex, weight, height, age) {
    if (sex === "male") {
        var MAGICADDEDNUM = 66.47;
        var WEIGHT_MULTIPLIER = 13.75;
        var HEIGHT_MULTIPLIER = 5.003;
        var AGE_MULTIPLIER = 6.755;
        return MAGICADDEDNUM + (WEIGHT_MULTIPLIER * weight) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age);
    }
    else if (sex === "female") {
        var MAGICADDEDNUM = 655.1;
        var WEIGHT_MULTIPLIER = 9.563;
        var HEIGHT_MULTIPLIER = 1.850;
        var AGE_MULTIPLIER = 4.676;
        return MAGICADDEDNUM + (WEIGHT_MULTIPLIER * weight) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age);
    }
    else {
        return 0;
    }
}
exports.default = getBMR;
