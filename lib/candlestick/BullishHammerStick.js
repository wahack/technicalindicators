"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bullishhammerstick = bullishhammerstick;
const CandlestickFinder_1 = require("./CandlestickFinder");
class BullishHammerStick extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'BullishHammerStick';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBullishHammer = daysClose > daysOpen;
        isBullishHammer = isBullishHammer && this.approximateEqual(daysClose, daysHigh);
        isBullishHammer = isBullishHammer && (daysClose - daysOpen) <= 2 * (daysOpen - daysLow);
        return isBullishHammer;
    }
}
exports.default = BullishHammerStick;
function bullishhammerstick(data) {
    return new BullishHammerStick().hasPattern(data);
}
