'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _network = require('../network');

var otherMiddleWare = {
    getCategories: async function getCategories(req, res, next) {
        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboCategoria()', '');
        return {
            status: 200,
            body: response
        };
    },
    getMarks: async function getMarks(req, res, next) {
        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboMarca()', '');
        return {
            status: 200,
            body: response
        };
    },
    getPresentations: async function getPresentations(req, res, next) {
        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboPresentacion()', '');
        return {
            status: 200,
            body: response
        };
    },
    getMeasurements: async function getMeasurements(req, res, next) {
        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaLLenarComboMedicion()', '');
        return {
            status: 200,
            body: response
        };
    },
    getCities: async function getCities(req, res, next) {
        var response = await (0, _network.callSPWithCallback)('Call GEN_llenarComboCidad_Mi_Sucursal()', '');
        return {
            status: 200,
            body: response
        };
    }
};

exports.default = otherMiddleWare;