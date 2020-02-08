'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.callSPWithNotCallback = exports.callSPWithCallback = undefined;

var _mysql = require('./mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {*} storeProcedureNameAndParams Script in mysql calling the sp
 * @param  {...any} params All params that the query needs.
 */
var callSPWithCallback = exports.callSPWithCallback = function callSPWithCallback(storeProcedureNameAndParams) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
    }

    try {
        return new Promise(function (resolve, reject) {
            _mysql2.default.query(storeProcedureNameAndParams, params, function (err, results) {
                if (err || !results) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    } catch (error) {
        throw error;
    }
};

var callSPWithNotCallback = exports.callSPWithNotCallback = function callSPWithNotCallback(storeProcedureNameAndParams) {
    for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
    }

    try {
        con.query(storeProcedureNameAndParams, params, function (err, result) {
            if (err) throw err;
        });
    } catch (error) {
        throw error;
    }
};