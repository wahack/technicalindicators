"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageLoss = exports.AvgLossInput = void 0;
exports.averageloss = averageloss;
const indicator_1 = require("../indicator/indicator");
class AvgLossInput extends indicator_1.IndicatorInput {
    values;
    period;
}
exports.AvgLossInput = AvgLossInput;
class AverageLoss extends indicator_1.Indicator {
    generator;
    constructor(input) {
        super(input);
        let values = input.values;
        let period = input.period;
        let format = this.format;
        this.generator = (function* (period) {
            var currentValue = yield;
            var counter = 1;
            var lossSum = 0;
            var avgLoss;
            var loss;
            var lastValue = currentValue;
            currentValue = yield;
            while (true) {
                loss = lastValue - currentValue;
                loss = loss > 0 ? loss : 0;
                if (loss > 0) {
                    lossSum = lossSum + loss;
                }
                if (counter < period) {
                    counter++;
                }
                else if (avgLoss === undefined) {
                    avgLoss = lossSum / period;
                }
                else {
                    avgLoss = ((avgLoss * (period - 1)) + loss) / period;
                }
                lastValue = currentValue;
                avgLoss = (avgLoss !== undefined) ? format(avgLoss) : undefined;
                currentValue = yield avgLoss;
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
    static calculate = averageloss;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
exports.AverageLoss = AverageLoss;
function averageloss(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new AverageLoss(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
