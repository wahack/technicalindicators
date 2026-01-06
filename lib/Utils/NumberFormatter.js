"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = format;
const config_1 = require("../config");
function format(v) {
    let precision = (0, config_1.getConfig)('precision');
    if (precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}
