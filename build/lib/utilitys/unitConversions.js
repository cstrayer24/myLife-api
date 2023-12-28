"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inchTocm = exports.poundToKg = void 0;
var conversionRates = {
    poundToKg: 2.205,
    inchTocm: 2.54
};
var poundToKg = function (poundValue) { return poundValue / conversionRates.poundToKg; };
exports.poundToKg = poundToKg;
var inchTocm = function (inchValue) { return inchValue * conversionRates.inchTocm; };
exports.inchTocm = inchTocm;
