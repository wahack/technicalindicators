"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hammerpatternunconfirmed = hammerpatternunconfirmed;
const HammerPattern_1 = require("./HammerPattern");
class HammerPatternUnconfirmed extends HammerPattern_1.default {
    constructor() {
        super();
        this.name = 'HammerPatternUnconfirmed';
    }
    logic(data) {
        let isPattern = this.downwardTrend(data, false);
        isPattern = isPattern && this.includesHammer(data, false);
        return isPattern;
    }
}
exports.default = HammerPatternUnconfirmed;
function hammerpatternunconfirmed(data) {
    return new HammerPatternUnconfirmed().hasPattern(data);
}
