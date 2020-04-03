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
    },
    getIdCompnay: async function getIdCompnay(req) {
        var idSucursal = req.params.idSucursal;

        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaIdEmpresa(?)', idSucursal).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    getSucursalsByCompany: async function getSucursalsByCompany() {
        var idEmpresa = req.params.idEmpresa;

        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaLlenarComboSucursal(?)', idEmpresa).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    getReasonForElimination: async function getReasonForElimination() {
        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaMotivosEliminacion()').then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    getIdReasons: async function getIdReasons(req) {
        var motivo = req.params.motivo;

        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaIdMotivo(?)', motivo).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    }

};

exports.default = otherMiddleWare;