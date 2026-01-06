"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sum = exports.SumInput = void 0;
exports.sum = sum;
const indicator_1 = require("../indicator/indicator");
const FixedSizeLinkedList_1 = require("./FixedSizeLinkedList");
class SumInput extends indicator_1.IndicatorInput {
    values;
    period;
}
exports.SumInput = SumInput;
class Sum extends indicator_1.Indicator {
    generator;
    constructor(input) {
        super(input);
        var values = input.values;
        var period = input.period;
        this.result = [];
        var periodList = new FixedSizeLinkedList_1.default(period, false, false, true);
        this.generator = (function* () {
            var result;
            var tick;
            var high;
            tick = yield;
            while (true) {
                periodList.push(tick);
                if (periodList.totalPushed >= period) {
                    high = periodList.periodSum;
                }
                tick = yield high;
            }
        })();
        this.generator.next();
        values.forEach((value, index) => {
            var result = this.generator.next(value);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate = sum;
    nextValue(price) {
        var result = this.generator.next(price);
        if (result.value != undefined) {
            return result.value;
        }
    }
    ;
}
exports.Sum = Sum;
function sum(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new Sum(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
