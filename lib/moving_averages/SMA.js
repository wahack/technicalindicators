"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMA = exports.MAInput = void 0;
exports.sma = sma;
//STEP 1. Import Necessary indicator or rather last step
const indicator_1 = require("../indicator/indicator");
const LinkedList_1 = require("../Utils/LinkedList");
//STEP 2. Create the input for the indicator, mandatory should be in the constructor
class MAInput extends indicator_1.IndicatorInput {
    period;
    values;
    constructor(period, values) {
        super();
        this.period = period;
        this.values = values;
    }
}
exports.MAInput = MAInput;
//STEP3. Add class based syntax with export
class SMA extends indicator_1.Indicator {
    period;
    price;
    result;
    generator;
    constructor(input) {
        super(input);
        this.period = input.period;
        this.price = input.values;
        var genFn = (function* (period) {
            var list = new LinkedList_1.LinkedList();
            var sum = 0;
            var counter = 1;
            var current = yield;
            var result;
            list.push(0);
            while (true) {
                if (counter < period) {
                    counter++;
                    list.push(current);
                    sum = sum + current;
                }
                else {
                    sum = sum - list.shift() + current;
                    result = ((sum) / period);
                    list.push(current);
                }
                current = yield result;
            }
        });
        this.generator = genFn(this.period);
        this.generator.next();
        this.result = [];
        this.price.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    static calculate = sma;
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
exports.SMA = SMA;
function sma(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new SMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
//STEP 6. Run the tests
