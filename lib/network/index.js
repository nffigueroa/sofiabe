'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.callSPWithCallback = undefined;

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {*} storeProcedureNameAndParams Script in mysql calling the sp
 * @param {*} callback It will triggered once the query was done.
 * @param  {...any} params All params that the query needs.
 */
var callSPWithCallback = exports.callSPWithCallback = function callSPWithCallback(storeProcedureNameAndParams) {
    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
    }

    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
        _mysql2.default.query(storeProcedureNameAndParams, params, function (err, result) {
            if (err) throw err;
            callback(JSON.stringify(result[0]));
        });
    } catch (error) {
        throw error;
    }
};