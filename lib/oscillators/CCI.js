"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCI = exports.CCIInput = void 0;
exports.cci = cci;
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("../moving_averages/SMA");
const FixedSizeLinkedList_1 = require("../Utils/FixedSizeLinkedList");
class CCIInput extends indicator_1.IndicatorInput {
    high;
    low;
    close;
    period;
}
exports.CCIInput = CCIInput;
;
class CCI extends indicator_1.Indicator {
    result;
    generator;
    ;
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        let constant = .015;
        var currentTpSet = new FixedSizeLinkedList_1.default(period);
        ;
        var tpSMACalculator = new SMA_1.SMA({ period: period, values: [], format: (v) => { return v; } });
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            while (true) {
                let tp = (tick.high + tick.low + tick.close) / 3;
                currentTpSet.push(tp);
                let smaTp = tpSMACalculator.nextValue(tp);
                let meanDeviation = null;
                let cci;
                let sum = 0;
                if (smaTp != undefined) {
                    //First, subtract the most recent 20-period average of the typical price from each period's typical price. 
                    //Second, take the absolute values of these numbers.
                    //Third,sum the absolute values. 
                    for (let x of currentTpSet.iterator()) {
                        sum = sum + (Math.abs(x - smaTp));
                    }
                    //Fourth, divide by the total number of periods (20). 
                    meanDeviation = sum / period;
                    cci = (tp - smaTp) / (constant * meanDeviation);
                }
                tick = yield cci;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate = cci;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
    ;
}
exports.CCI = CCI;
function cci(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new CCI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
