"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./mysql"));
/**
 *
 * @param {*} storeProcedureNameAndParams Script in mysql calling the sp
 * @param  {...any} params All params that the query needs.
 */
exports.callSPWithCallback = function (storeProcedureNameAndParams) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    try {
        return new Promise(function (resolve, reject) {
            mysql_1.default.query(storeProcedureNameAndParams, params, function (err, results) {
                if (err || !results) {
                    return reject(err);
                }
                resolve((results[0]));
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.callSPWithNotCallback = function (storeProcedureNameAndParams) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    try {
        mysql_1.default.query(storeProcedureNameAndParams, params, function (err, result) {
            if (err)
                throw err;
        });
    }
    catch (error) {
        throw error;
    }
};
