"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StochasticRSI = exports.StochasticRSIOutput = exports.StochasticRsiInput = void 0;
exports.stochasticrsi = stochasticrsi;
const indicator_1 = require("../indicator/indicator");
/**
 * Created by AAravindan on 5/10/16.
 */
"use strict";
const SMA_1 = require("../moving_averages/SMA");
const RSI_1 = require("../oscillators/RSI");
const Stochastic_1 = require("../momentum/Stochastic");
class StochasticRsiInput extends indicator_1.IndicatorInput {
    values;
    rsiPeriod;
    stochasticPeriod;
    kPeriod;
    dPeriod;
}
exports.StochasticRsiInput = StochasticRsiInput;
;
class StochasticRSIOutput {
    stochRSI;
    k;
    d;
}
exports.StochasticRSIOutput = StochasticRSIOutput;
;
class StochasticRSI extends indicator_1.Indicator {
    result;
    generator;
    constructor(input) {
        super(input);
        let closes = input.values;
        let rsiPeriod = input.rsiPeriod;
        let stochasticPeriod = input.stochasticPeriod;
        let kPeriod = input.kPeriod;
        let dPeriod = input.dPeriod;
        let format = this.format;
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            let rsi = new RSI_1.RSI({ period: rsiPeriod, values: [] });
            let stochastic = new Stochastic_1.Stochastic({ period: stochasticPeriod, high: [], low: [], close: [], signalPeriod: kPeriod });
            let dSma = new SMA_1.SMA({
                period: dPeriod,
                values: [],
                format: (v) => { return v; }
            });
            let lastRSI, stochasticRSI, d, result;
            var tick = yield;
            while (true) {
                lastRSI = rsi.nextValue(tick);
                if (lastRSI !== undefined) {
                    var stochasticInput = { high: lastRSI, low: lastRSI, close: lastRSI };
                    stochasticRSI = stochastic.nextValue(stochasticInput);
                    if (stochasticRSI !== undefined && stochasticRSI.d !== undefined) {
                        d = dSma.nextValue(stochasticRSI.d);
                        if (d !== undefined)
                            result = {
                                stochRSI: stochasticRSI.k,
                                k: stochasticRSI.d,
                                d: d
                            };
                    }
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        closes.forEach((tick, index) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate = stochasticrsi;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
exports.StochasticRSI = StochasticRSI;
function stochasticrsi(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new StochasticRSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
