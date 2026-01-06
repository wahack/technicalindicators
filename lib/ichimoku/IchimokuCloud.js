"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IchimokuCloud = exports.IchimokuCloudOutput = exports.IchimokuCloudInput = void 0;
exports.ichimokucloud = ichimokucloud;
const indicator_1 = require("../indicator/indicator");
const FixedSizeLinkedList_1 = require("../Utils/FixedSizeLinkedList");
class IchimokuCloudInput extends indicator_1.IndicatorInput {
    high;
    low;
    conversionPeriod = 9;
    basePeriod = 26;
    spanPeriod = 52;
    displacement = 26;
}
exports.IchimokuCloudInput = IchimokuCloudInput;
class IchimokuCloudOutput {
    conversion;
    base;
    spanA;
    spanB;
}
exports.IchimokuCloudOutput = IchimokuCloudOutput;
class IchimokuCloud extends indicator_1.Indicator {
    result;
    generator;
    constructor(input) {
        super(input);
        this.result = [];
        var defaults = {
            conversionPeriod: 9,
            basePeriod: 26,
            spanPeriod: 52,
            displacement: 26
        };
        var params = Object.assign({}, defaults, input);
        var currentConversionData = new FixedSizeLinkedList_1.default(params.conversionPeriod * 2, true, true, false);
        var currentBaseData = new FixedSizeLinkedList_1.default(params.basePeriod * 2, true, true, false);
        var currenSpanData = new FixedSizeLinkedList_1.default(params.spanPeriod * 2, true, true, false);
        this.generator = (function* () {
            let result;
            let tick;
            let period = Math.max(params.conversionPeriod, params.basePeriod, params.spanPeriod, params.displacement);
            let periodCounter = 1;
            tick = yield;
            while (true) {
                // Keep a list of lows/highs for the max period
                currentConversionData.push(tick.high);
                currentConversionData.push(tick.low);
                currentBaseData.push(tick.high);
                currentBaseData.push(tick.low);
                currenSpanData.push(tick.high);
                currenSpanData.push(tick.low);
                if (periodCounter < period) {
                    periodCounter++;
                }
                else {
                    // Tenkan-sen (ConversionLine): (9-period high + 9-period low)/2))
                    let conversionLine = (currentConversionData.periodHigh + currentConversionData.periodLow) / 2;
                    // Kijun-sen (Base Line): (26-period high + 26-period low)/2))
                    let baseLine = (currentBaseData.periodHigh + currentBaseData.periodLow) / 2;
                    // Senkou Span A (Leading Span A): (Conversion Line + Base Line)/2))
                    let spanA = (conversionLine + baseLine) / 2;
                    // Senkou Span B (Leading Span B): (52-period high + 52-period low)/2))
                    let spanB = (currenSpanData.periodHigh + currenSpanData.periodLow) / 2;
                    // Senkou Span A / Senkou Span B offset by 26 periods
                    // if(spanCounter < params.displacement) {
                    // 	spanCounter++
                    // } else {
                    // 	spanA = spanAs.shift()
                    // 	spanB = spanBs.shift()
                    // }
                    result = {
                        conversion: conversionLine,
                        base: baseLine,
                        spanA: spanA,
                        spanB: spanB
                    };
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        input.low.forEach((tick, index) => {
            var result = this.generator.next({
                high: input.high[index],
                low: input.low[index],
            });
            if (result.value) {
                this.result.push(result.value);
            }
        });
    }
    static calculate = ichimokucloud;
    nextValue(price) {
        return this.generator.next(price).value;
    }
}
exports.IchimokuCloud = IchimokuCloud;
function ichimokucloud(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new IchimokuCloud(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
