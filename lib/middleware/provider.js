"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.middlewareProvider = undefined;

var _network = require("../network");

var _response = require("../models/response");

var _createNewProvider = require("../models/createNewProvider");

var middlewareProvider = exports.middlewareProvider = {
    getProviders: async function getProviders(req) {
        var idSucursal = req.params.idSucursal;

        var response = await (0, _network.callSPWithCallback)('Call PRO_consultaLlenarTablaProveedor(?)', idSucursal).then(function (response) {
            return (0, _response.ResponseBodyBuilder)(200, false, response);
        }).catch(function (err) {
            return (0, _response.ResponseBodyBuilder)(500, true, err);
        });
        return response;
    },
    insertProvider: async function insertProvider(req) {
        var idSucursal = req.params.idSucursal;

        var newProvider = new _createNewProvider.CreateNewProvider(req.body);
        var response = await (0, _network.callSPWithCallback)('Call PRO_consultaLlenarTablaProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', newProvider).then(function (response) {
            return (0, _response.ResponseBodyBuilder)(200, false, response);
        }).catch(function (err) {
            return (0, _response.ResponseBodyBuilder)(500, true, err);
        });
        return response;
    },
    updateProvider: function updateProvider() {
        //TODO
    },
    getProviderCategories: function getProviderCategories() {
        //TODO
    },
    deleteProvider: function deleteProvider() {
        //TODO
    },
    insertProviderCategory: function insertProviderCategory() {
        //TODO
    },
    getAllProviders: async function getAllProviders() {
        var response = await (0, _network.callSPWithCallback)('Call GEN_consultaLlenarComboProveedor()').then(function (response) {
            return (0, _response.ResponseBodyBuilder)(200, false, response);
        }).catch(function (err) {
            return (0, _response.ResponseBodyBuilder)(500, true, err);
        });
        return response;
    }
};