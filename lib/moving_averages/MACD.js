"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MACD = exports.MACDOutput = exports.MACDInput = void 0;
exports.macd = macd;
/**
 * Created by AAravindan on 5/4/16.
 */
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("./SMA");
const EMA_1 = require("./EMA");
class MACDInput extends indicator_1.IndicatorInput {
    values;
    SimpleMAOscillator = true;
    SimpleMASignal = true;
    fastPeriod;
    slowPeriod;
    signalPeriod;
    constructor(values) {
        super();
        this.values = values;
    }
}
exports.MACDInput = MACDInput;
class MACDOutput {
    MACD;
    signal;
    histogram;
}
exports.MACDOutput = MACDOutput;
class MACD extends indicator_1.Indicator {
    result;
    generator;
    constructor(input) {
        super(input);
        var oscillatorMAtype = input.SimpleMAOscillator ? SMA_1.SMA : EMA_1.EMA;
        var signalMAtype = input.SimpleMASignal ? SMA_1.SMA : EMA_1.EMA;
        var fastMAProducer = new oscillatorMAtype({ period: input.fastPeriod, values: [], format: (v) => { return v; } });
        var slowMAProducer = new oscillatorMAtype({ period: input.slowPeriod, values: [], format: (v) => { return v; } });
        var signalMAProducer = new signalMAtype({ period: input.signalPeriod, values: [], format: (v) => { return v; } });
        var format = this.format;
        this.result = [];
        this.generator = (function* () {
            var index = 0;
            var tick;
            var MACD, signal, histogram, fast, slow;
            while (true) {
                if (index < input.slowPeriod) {
                    tick = yield;
                    fast = fastMAProducer.nextValue(tick);
                    slow = slowMAProducer.nextValue(tick);
                    index++;
                    continue;
                }
                if (fast && slow) { //Just for typescript to be happy
                    MACD = fast - slow;
                    signal = signalMAProducer.nextValue(MACD);
                }
                histogram = MACD - signal;
                tick = yield ({
                    //fast : fast,
                    //slow : slow,
                    MACD: format(MACD),
                    signal: signal ? format(signal) : undefined,
                    histogram: isNaN(histogram) ? undefined : format(histogram)
                });
                fast = fastMAProducer.nextValue(tick);
                slow = slowMAProducer.nextValue(tick);
            }
        })();
        this.generator.next();
        input.values.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    static calculate = macd;
    nextValue(price) {
        var result = this.generator.next(price).value;
        return result;
    }
    ;
}
exports.MACD = MACD;
function macd(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new MACD(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
