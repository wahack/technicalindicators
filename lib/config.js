"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = setConfig;
exports.getConfig = getConfig;
let config = {};
function setConfig(key, value) {
    config[key] = value;
}
function getConfig(key) {
    return config[key];
}
