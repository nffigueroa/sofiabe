'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _common = require('../util/common');

var _network = require('../network');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var otherMiddleWare = {
    getCategories: function getCategories(req, res, next) {
        (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboCategoria()', function (response) {
            return res.send(response);
        }, '');
        next();
    },
    getMarks: function getMarks(req, res, next) {
        (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboMarca()', function (response) {
            return res.send(response);
        }, '');
        next();
    },
    getPresentations: function getPresentations(req, res, next) {
        (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboPresentacion()', function (response) {
            return res.send(response);
        }, '');
        next();
    },
    getMeasurements: function getMeasurements(req, res, next) {
        (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboMedicion()', function (response) {
            return res.send(response);
        }, '');
        next();
    }
};

exports.default = otherMiddleWare;