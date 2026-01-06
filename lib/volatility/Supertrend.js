"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supertrend = exports.SupertrendOutput = exports.SupertrendInput = void 0;
exports.supertrend = supertrend;
const indicator_1 = require("../indicator/indicator");
const ATR_1 = require("../directionalmovement/ATR");
const SMA_1 = require("../moving_averages/SMA");
class SupertrendInput extends indicator_1.IndicatorInput {
    high;
    low;
    close;
    period = 10;
    multiplier = 3;
    changeATR = true;
}
exports.SupertrendInput = SupertrendInput;
class SupertrendOutput extends indicator_1.IndicatorInput {
    supertrend;
    upper;
    lower;
    trend; // 1 for up, -1 for down
    buySignal;
    sellSignal;
}
exports.SupertrendOutput = SupertrendOutput;
class Supertrend extends indicator_1.Indicator {
    result;
    generator;
    constructor(input) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var closes = input.close;
        var period = input.period;
        var multiplier = input.multiplier;
        var changeATR = input.changeATR;
        var format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low, high, close) not of equal size');
        }
        var length = Math.min(highs.length, lows.length, closes.length);
        if (length === 0) {
            this.result = [];
            return;
        }
        // Compute ATR series
        var atrAligned = new Array(length).fill(undefined);
        if (changeATR) {
            // Use ATR class
            var atrSeries = new ATR_1.ATR({
                high: highs,
                low: lows,
                close: closes,
                period: period,
                format: (v) => { return v; }
            }).result;
            // atrSeries starts from index (period - 1) in the result
            for (let i = period - 1; i < length; i++) {
                atrAligned[i] = atrSeries[i - (period - 1)];
            }
        }
        else {
            // Compute True Range and then SMA(TR, period)
            var tr = [];
            for (let i = 0; i < length; i++) {
                if (i === 0) {
                    tr.push(highs[i] - lows[i]);
                }
                else {
                    var hl = highs[i] - lows[i];
                    var hc = Math.abs(highs[i] - closes[i - 1]);
                    var lc = Math.abs(lows[i] - closes[i - 1]);
                    tr.push(Math.max(hl, hc, lc));
                }
            }
            var trSma = new SMA_1.SMA({
                period: period,
                values: tr,
                format: (v) => { return v; }
            }).result;
            for (let i = period - 1; i < length; i++) {
                atrAligned[i] = trSma[i - (period - 1)];
            }
        }
        // Initialize arrays
        var up = new Array(length).fill(undefined);
        var dn = new Array(length).fill(undefined);
        var trend = new Array(length).fill(undefined);
        var st = new Array(length).fill(undefined);
        var buySignal = new Array(length).fill(false);
        var sellSignal = new Array(length).fill(false);
        // Calculate Supertrend
        for (let i = 0; i < length; i++) {
            if (atrAligned[i] !== undefined) {
                // hl2 source
                var src = (highs[i] + lows[i]) / 2;
                var basicUp = src - multiplier * atrAligned[i];
                var basicDn = src + multiplier * atrAligned[i];
                // Pine logic: up := close[1] > up1 ? max(up, up1) : up
                var up1 = i > 0 ? up[i - 1] : undefined;
                if (i > 0 && up1 !== undefined && closes[i - 1] > up1) {
                    up[i] = Math.max(basicUp, up1);
                }
                else {
                    up[i] = basicUp;
                }
                // Pine logic: dn := close[1] < dn1 ? min(dn, dn1) : dn
                var dn1 = i > 0 ? dn[i - 1] : undefined;
                if (i > 0 && dn1 !== undefined && closes[i - 1] < dn1) {
                    dn[i] = Math.min(basicDn, dn1);
                }
                else {
                    dn[i] = basicDn;
                }
                // Trend flip logic
                var prevTrend = i > 0 && trend[i - 1] !== undefined ? trend[i - 1] : 1;
                var t = prevTrend;
                // trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
                if (prevTrend === -1 && dn1 !== undefined && closes[i] > dn1) {
                    t = 1;
                }
                else if (prevTrend === 1 && up1 !== undefined && closes[i] < up1) {
                    t = -1;
                }
                trend[i] = t;
                st[i] = t === 1 ? up[i] : dn[i];
                // Buy/Sell signals
                if (i > 0 && trend[i - 1] !== undefined) {
                    buySignal[i] = trend[i] === 1 && trend[i - 1] === -1;
                    sellSignal[i] = trend[i] === -1 && trend[i - 1] === 1;
                }
            }
        }
        // Build result array
        this.result = [];
        var resultLength = length;
        this.generator = (function* () {
            var tick = yield;
            var index = 0;
            while (true) {
                if (index < resultLength && st[index] !== undefined) {
                    var result = {
                        supertrend: format(st[index]),
                        upper: format(up[index]),
                        lower: format(dn[index]),
                        trend: trend[index],
                        buySignal: buySignal[index],
                        sellSignal: sellSignal[index]
                    };
                    index++;
                    tick = yield result;
                }
                else {
                    index++;
                    tick = yield undefined;
                }
            }
        })();
        this.generator.next();
        // Populate result array
        for (let i = 0; i < length; i++) {
            if (st[i] !== undefined) {
                this.result.push({
                    supertrend: format(st[i]),
                    upper: format(up[i]),
                    lower: format(dn[i]),
                    trend: trend[i],
                    buySignal: buySignal[i],
                    sellSignal: sellSignal[i]
                });
            }
        }
    }
    static calculate = supertrend;
    nextValue(price) {
        var result = this.generator.next(price);
        if (result.value !== undefined) {
            return result.value;
        }
    }
}
exports.Supertrend = Supertrend;
function supertrend(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new Supertrend(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
