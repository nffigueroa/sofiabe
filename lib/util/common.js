"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("../network");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moment = require('moment');
exports.getDateYYYYMMDD = function () {
    return moment().format('YYYY-MM-DD');
};
exports.getCurrentTime = function () {
    return moment().format('HH:MM:SS');
};
exports.registerMovements = function (_a) {
    var id_usuario = _a.id_usuario, descripcion = _a.descripcion;
    network_1.callSPWithNotCallback('Call US_registrarHistorial(? ,? ,? ,? )', [id_usuario, , exports.getDateYYYYMMDD(), exports.getCurrentTime(), descripcion]);
};
exports.sign = function (data) {
    return jsonwebtoken_1.default.sign(data, 'swincomc_20140512_siventas');
};
