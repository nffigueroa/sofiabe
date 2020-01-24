'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerMovements = exports.getCurrentTime = exports.getDateYYYYMMDD = exports.decrypt = exports.encrypt = undefined;

var _const = require('./const');

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

var encrypt = exports.encrypt = function encrypt(plainText) {
    var b64 = _cryptoJs2.default.AES.encrypt(plainText, _const.key).toString();
    var e64 = _cryptoJs2.default.enc.Base64.parse(b64);
    var eHex = e64.toString(_cryptoJs2.default.enc.Hex);
    return eHex;
};

var decrypt = exports.decrypt = function decrypt(cipherText) {
    var reb64 = _cryptoJs2.default.enc.Hex.parse(cipherText);
    var bytes = reb64.toString(_cryptoJs2.default.enc.Base64);
    var decrypt = _cryptoJs2.default.AES.decrypt(bytes, _const.key);
    var plain = decrypt.toString(_cryptoJs2.default.enc.Utf8);
    return plain;
};

var getDateYYYYMMDD = exports.getDateYYYYMMDD = function getDateYYYYMMDD() {
    return moment().format('YYYY-MM-DD');
};

var getCurrentTime = exports.getCurrentTime = function getCurrentTime() {
    return moment().format('HH:MM:SS');
};

var registerMovements = exports.registerMovements = function registerMovements(_ref) {
    var id_usuario = _ref.id_usuario,
        descripcion = _ref.descripcion;

    _mysql2.default.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('Call US_registrarHistorial(? ,? ,? ,? )', [id_usuario,, getDateYYYYMMDD(), getCurrentTime(), descripcion], function (err, result) {
            if (err) throw err;
        });
    });
};