"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("../network");
var jwtLibrady = __importStar(require("jsonwebtoken"));
var const_1 = require("./const");
var moment = require("moment");
exports.getDateYYYYMMDD = function () {
    return moment().format("YYYY-MM-DD");
};
exports.getCurrentTime = function () {
    return moment().format("HH:MM:SS");
};
exports.registerMovements = function (_a) {
    var proccess = _a.proccess, id_usuario = _a.id_usuario, descripcion = _a.descripcion;
    try {
        network_1.callSPWithCallback("Call US_registrarHistorial(? ,? ,? ,?, ?)", proccess, id_usuario, exports.getDateYYYYMMDD(), exports.getCurrentTime(), descripcion);
    }
    catch (error) {
        throw error;
    }
};
exports.sign = function (data) {
    return jwtLibrady.sign({ data: data, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, const_1.key);
};
exports.verifyJWT = function (jwt) { return jwtLibrady.verify(jwt, const_1.key); };
