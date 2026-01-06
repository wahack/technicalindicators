"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearishhammerstick = bearishhammerstick;
const CandlestickFinder_1 = require("./CandlestickFinder");
class BearishHammerStick extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'BearishHammerStick';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBearishHammer = daysOpen > daysClose;
        isBearishHammer = isBearishHammer && this.approximateEqual(daysOpen, daysHigh);
        isBearishHammer = isBearishHammer && (daysOpen - daysClose) <= 2 * (daysClose - daysLow);
        return isBearishHammer;
    }
}
exports.default = BearishHammerStick;
function bearishhammerstick(data) {
    return new BearishHammerStick().hasPattern(data);
}
