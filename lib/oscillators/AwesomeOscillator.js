"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwesomeOscillator = exports.AwesomeOscillatorInput = void 0;
exports.awesomeoscillator = awesomeoscillator;
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("../moving_averages/SMA");
class AwesomeOscillatorInput extends indicator_1.IndicatorInput {
    high;
    low;
    fastPeriod;
    slowPeriod;
}
exports.AwesomeOscillatorInput = AwesomeOscillatorInput;
class AwesomeOscillator extends indicator_1.Indicator {
    generator;
    constructor(input) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var fastPeriod = input.fastPeriod;
        var slowPeriod = input.slowPeriod;
        var slowSMA = new SMA_1.SMA({ values: [], period: slowPeriod });
        var fastSMA = new SMA_1.SMA({ values: [], period: fastPeriod });
        this.result = [];
        this.generator = (function* () {
            var result;
            var tick;
            var medianPrice;
            var slowSmaValue;
            var fastSmaValue;
            tick = yield;
            while (true) {
                medianPrice = (tick.high + tick.low) / 2;
                slowSmaValue = slowSMA.nextValue(medianPrice);
                fastSmaValue = fastSMA.nextValue(medianPrice);
                if (slowSmaValue !== undefined && fastSmaValue !== undefined) {
                    result = fastSmaValue - slowSmaValue;
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        highs.forEach((tickHigh, index) => {
            var tickInput = {
                high: tickHigh,
                low: lows[index],
            };
            var result = this.generator.next(tickInput);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    ;
    static calculate = awesomeoscillator;
    nextValue(price) {
        var result = this.generator.next(price);
        if (result.value != undefined) {
            return this.format(result.value);
        }
    }
    ;
}
exports.AwesomeOscillator = AwesomeOscillator;
function awesomeoscillator(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new AwesomeOscillator(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
