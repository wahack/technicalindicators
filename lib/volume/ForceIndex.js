"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceIndex = exports.ForceIndexInput = void 0;
exports.forceindex = forceindex;
const EMA_1 = require("../moving_averages/EMA");
const indicator_1 = require("../indicator/indicator");
class ForceIndexInput extends indicator_1.IndicatorInput {
    close;
    volume;
    period = 1;
}
exports.ForceIndexInput = ForceIndexInput;
;
class ForceIndex extends indicator_1.Indicator {
    result;
    generator;
    ;
    constructor(input) {
        super(input);
        var closes = input.close;
        var volumes = input.volume;
        var period = input.period || 1;
        if (!((volumes.length === closes.length))) {
            throw ('Inputs(volume, close) not of equal size');
        }
        let emaForceIndex = new EMA_1.EMA({ values: [], period: period });
        this.result = [];
        this.generator = (function* () {
            var previousTick = yield;
            var tick = yield;
            let forceIndex;
            while (true) {
                forceIndex = (tick.close - previousTick.close) * tick.volume;
                previousTick = tick;
                tick = yield emaForceIndex.nextValue(forceIndex);
            }
        })();
        this.generator.next();
        volumes.forEach((tick, index) => {
            var result = this.generator.next({
                close: closes[index],
                volume: volumes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate = forceindex;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
    ;
}
exports.ForceIndex = ForceIndex;
function forceindex(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new ForceIndex(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
