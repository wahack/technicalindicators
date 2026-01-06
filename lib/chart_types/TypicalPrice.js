"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypicalPrice = exports.TypicalPriceInput = void 0;
exports.typicalprice = typicalprice;
/**
 * Created by AAravindan on 5/4/16.
 */
const indicator_1 = require("../indicator/indicator");
class TypicalPriceInput extends indicator_1.IndicatorInput {
    low;
    high;
    close;
}
exports.TypicalPriceInput = TypicalPriceInput;
class TypicalPrice extends indicator_1.Indicator {
    result = [];
    generator;
    constructor(input) {
        super(input);
        this.generator = (function* () {
            let priceInput = yield;
            while (true) {
                priceInput = yield (priceInput.high + priceInput.low + priceInput.close) / 3;
            }
        })();
        this.generator.next();
        input.low.forEach((tick, index) => {
            var result = this.generator.next({
                high: input.high[index],
                low: input.low[index],
                close: input.close[index],
            });
            this.result.push(result.value);
        });
    }
    static calculate = typicalprice;
    nextValue(price) {
        var result = this.generator.next(price).value;
        return result;
    }
    ;
}
exports.TypicalPrice = TypicalPrice;
function typicalprice(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new TypicalPrice(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
;
