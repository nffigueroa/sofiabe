'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sign = exports.registerMovements = exports.getCurrentTime = exports.getDateYYYYMMDD = undefined;

var _network = require('../network');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

var getDateYYYYMMDD = exports.getDateYYYYMMDD = function getDateYYYYMMDD() {
    return moment().format('YYYY-MM-DD');
};

var getCurrentTime = exports.getCurrentTime = function getCurrentTime() {
    return moment().format('HH:MM:SS');
};

var registerMovements = exports.registerMovements = function registerMovements(_ref) {
    var id_usuario = _ref.id_usuario,
        descripcion = _ref.descripcion;

    (0, _network.callSPWithNotCallback)('Call US_registrarHistorial(? ,? ,? ,? )', [id_usuario,, getDateYYYYMMDD(), getCurrentTime(), descripcion]);
};

var sign = exports.sign = function sign(data) {
    return _jsonwebtoken2.default.sign(data, 'swincomc_20140512_siventas');
};