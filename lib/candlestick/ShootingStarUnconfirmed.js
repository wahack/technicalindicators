"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shootingstarunconfirmed = shootingstarunconfirmed;
const ShootingStar_1 = require("./ShootingStar");
class ShootingStarUnconfirmed extends ShootingStar_1.default {
    constructor() {
        super();
        this.name = 'ShootingStarUnconfirmed';
    }
    logic(data) {
        let isPattern = this.upwardTrend(data, false);
        isPattern = isPattern && this.includesHammer(data, false);
        return isPattern;
    }
}
exports.default = ShootingStarUnconfirmed;
function shootingstarunconfirmed(data) {
    return new ShootingStarUnconfirmed().hasPattern(data);
}
