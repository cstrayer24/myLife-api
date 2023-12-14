"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAgeFromDate(dateStr) {
    var dateNums = dateStr.split('-');
    var year = parseInt(dateNums[0]);
    var month = parseInt(dateNums[1]);
    var days = parseInt(dateNums[2]);
    var yearsOld = new Date().getFullYear() - year;
    if (month < new Date().getMonth()) {
        yearsOld -= 1;
    }
    return yearsOld;
}
exports.default = getAgeFromDate;
