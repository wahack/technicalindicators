"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lowest = exports.LowestInput = void 0;
exports.lowest = lowest;
const indicator_1 = require("../indicator/indicator");
const FixedSizeLinkedList_1 = require("./FixedSizeLinkedList");
class LowestInput extends indicator_1.IndicatorInput {
    values;
    period;
}
exports.LowestInput = LowestInput;
class Lowest extends indicator_1.Indicator {
    generator;
    constructor(input) {
        super(input);
        var values = input.values;
        var period = input.period;
        this.result = [];
        var periodList = new FixedSizeLinkedList_1.default(period, false, true, false);
        this.generator = (function* () {
            var result;
            var tick;
            var high;
            tick = yield;
            while (true) {
                periodList.push(tick);
                if (periodList.totalPushed >= period) {
                    high = periodList.periodLow;
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
    static calculate = lowest;
    nextValue(price) {
        var result = this.generator.next(price);
        if (result.value != undefined) {
            return result.value;
        }
    }
    ;
}
exports.Lowest = Lowest;
function lowest(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new Lowest(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
