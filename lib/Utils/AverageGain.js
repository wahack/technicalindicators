"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageGain = exports.AvgGainInput = void 0;
exports.averagegain = averagegain;
const indicator_1 = require("../indicator/indicator");
class AvgGainInput extends indicator_1.IndicatorInput {
    period;
    values;
}
exports.AvgGainInput = AvgGainInput;
class AverageGain extends indicator_1.Indicator {
    generator;
    constructor(input) {
        super(input);
        let values = input.values;
        let period = input.period;
        let format = this.format;
        this.generator = (function* (period) {
            var currentValue = yield;
            var counter = 1;
            var gainSum = 0;
            var avgGain;
            var gain;
            var lastValue = currentValue;
            currentValue = yield;
            while (true) {
                gain = currentValue - lastValue;
                gain = gain > 0 ? gain : 0;
                if (gain > 0) {
                    gainSum = gainSum + gain;
                }
                if (counter < period) {
                    counter++;
                }
                else if (avgGain === undefined) {
                    avgGain = gainSum / period;
                }
                else {
                    avgGain = ((avgGain * (period - 1)) + gain) / period;
                }
                lastValue = currentValue;
                avgGain = (avgGain !== undefined) ? format(avgGain) : undefined;
                currentValue = yield avgGain;
            }
        })(period);
        this.generator.next();
        this.result = [];
        values.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    static calculate = averagegain;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
exports.AverageGain = AverageGain;
function averagegain(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new AverageGain(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
