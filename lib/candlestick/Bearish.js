"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearish = bearish;
const BearishEngulfingPattern_1 = require("./BearishEngulfingPattern");
const BearishHarami_1 = require("./BearishHarami");
const BearishHaramiCross_1 = require("./BearishHaramiCross");
const EveningDojiStar_1 = require("./EveningDojiStar");
const EveningStar_1 = require("./EveningStar");
const BearishMarubozu_1 = require("./BearishMarubozu");
const ThreeBlackCrows_1 = require("./ThreeBlackCrows");
const BearishHammerStick_1 = require("./BearishHammerStick");
const BearishInvertedHammerStick_1 = require("./BearishInvertedHammerStick");
const HangingMan_1 = require("./HangingMan");
const HangingManUnconfirmed_1 = require("./HangingManUnconfirmed");
const ShootingStar_1 = require("./ShootingStar");
const ShootingStarUnconfirmed_1 = require("./ShootingStarUnconfirmed");
const TweezerTop_1 = require("./TweezerTop");
const CandlestickFinder_1 = require("./CandlestickFinder");
let bearishPatterns = [
    new BearishEngulfingPattern_1.default(),
    new BearishHarami_1.default(),
    new BearishHaramiCross_1.default(),
    new EveningDojiStar_1.default(),
    new EveningStar_1.default(),
    new BearishMarubozu_1.default(),
    new ThreeBlackCrows_1.default(),
    new BearishHammerStick_1.default(),
    new BearishInvertedHammerStick_1.default(),
    new HangingMan_1.default(),
    new HangingManUnconfirmed_1.default(),
    new ShootingStar_1.default(),
    new ShootingStarUnconfirmed_1.default(),
    new TweezerTop_1.default()
];
class BearishPatterns extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'Bearish Candlesticks';
    }
    hasPattern(data) {
        return bearishPatterns.reduce(function (state, pattern) {
            return state || pattern.hasPattern(data);
        }, false);
    }
}
exports.default = BearishPatterns;
function bearish(data) {
    return new BearishPatterns().hasPattern(data);
}
