"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossOver = exports.CrossInput = void 0;
exports.crossOver = crossOver;
const indicator_1 = require("../indicator/indicator");
const CrossUp_1 = require("./CrossUp");
const CrossDown_1 = require("./CrossDown");
class CrossInput extends indicator_1.IndicatorInput {
    lineA;
    lineB;
    constructor(lineA, lineB) {
        super();
        this.lineA = lineA;
        this.lineB = lineB;
    }
}
exports.CrossInput = CrossInput;
class CrossOver extends indicator_1.Indicator {
    generator;
    result;
    constructor(input) {
        super(input);
        var crossUp = new CrossUp_1.CrossUp({ lineA: input.lineA, lineB: input.lineB });
        var crossDown = new CrossDown_1.CrossDown({ lineA: input.lineA, lineB: input.lineB });
        const genFn = (function* () {
            var current = yield;
            var result = false;
            var first = true;
            while (true) {
                var nextUp = crossUp.nextValue(current.valueA, current.valueB);
                var nextDown = crossDown.nextValue(current.valueA, current.valueB);
                result = nextUp || nextDown;
                if (first)
                    result = false;
                first = false;
                current = yield result;
            }
        });
        this.generator = genFn();
        this.generator.next();
        var resultA = crossUp.getResult();
        var resultB = crossDown.getResult();
        this.result = resultA.map((a, index) => {
            if (index === 0)
                return false;
            return !!(a || resultB[index]);
        });
    }
    static calculate = crossOver;
    static reverseInputs(input) {
        if (input.reversedInput) {
            input.lineA ? input.lineA.reverse() : undefined;
            input.lineB ? input.lineB.reverse() : undefined;
        }
    }
    nextValue(valueA, valueB) {
        return this.generator.next({
            valueA: valueA,
            valueB: valueB
        }).value;
    }
    ;
}
exports.CrossOver = CrossOver;
function crossOver(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new CrossOver(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
