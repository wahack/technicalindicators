"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBV = exports.OBVInput = void 0;
exports.obv = obv;
const indicator_1 = require("../indicator/indicator");
/**
 * Created by AAravindan on 5/17/16.
 */
"use strict";
class OBVInput extends indicator_1.IndicatorInput {
    close;
    volume;
}
exports.OBVInput = OBVInput;
class OBV extends indicator_1.Indicator {
    generator;
    constructor(input) {
        super(input);
        var closes = input.close;
        var volumes = input.volume;
        this.result = [];
        this.generator = (function* () {
            var result = 0;
            var tick;
            var lastClose;
            tick = yield;
            if (tick.close && (typeof tick.close === 'number')) {
                lastClose = tick.close;
                tick = yield;
            }
            while (true) {
                if (lastClose < tick.close) {
                    result = result + tick.volume;
                }
                else if (tick.close < lastClose) {
                    result = result - tick.volume;
                }
                lastClose = tick.close;
                tick = yield result;
            }
        })();
        this.generator.next();
        closes.forEach((close, index) => {
            let tickInput = {
                close: closes[index],
                volume: volumes[index]
            };
            let result = this.generator.next(tickInput);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    static calculate = obv;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
exports.OBV = OBV;
function obv(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new OBV(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
