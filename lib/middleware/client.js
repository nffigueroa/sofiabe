'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _network = require('../network');

var _createNewClient = require('../models/createNewClient');

var _response = require('../models/response');

var _common = require('../util/common');

var clientMiddleware = {
    getClients: async function getClients(req, res, next) {
        var idSucursal = req.params.idSucursal;
        var response = await (0, _network.callSPWithCallback)('Call CLI_llenarTabla_Cliente(?)', idSucursal).then(function (response) {
            return (0, _response.ResponseBodyBuilder)(200, false, response);
        }).catch(function (err) {
            return (0, _response.ResponseBodyBuilder)(500, true, { message: 'getClients Err:' + err });
        });
        return response;
    },
    createNewClient: async function createNewClient(req, res, next) {
        var bodyCereateNewClient = new _createNewClient.CreateNewClient(req.body);
        var response = await (0, _network.callSPWithCallback)('Call CLI_registrarCliente(?)', bodyCereateNewClient.clientBody).then(function (response) {
            return (0, _response.ResponseBodyBuilder)(200, false, response);
        }).catch(function (error) {
            return (0, _response.ResponseBodyBuilder)(500, false, error);
        });
        return response;
    },
    deleteClient: async function deleteClient(req, res, next) {
        var idClient = req.params.idClient;
        var response = await (0, _network.callSPWithCallback)('Call CLI_eliminar_Cliente(?)', idClient).then(function (response) {
            console.log(response);
            if (response) {
                return (0, _response.ResponseBodyBuilder)(200, false, !!response);
            } else {
                return (0, _response.ResponseBodyBuilder)(404, true, 'Can not find id ' + idClient);
            }
        }).catch(function (error) {
            return (0, _response.ResponseBodyBuilder)(500, false, error);
        });
        return response;
    }
};

exports.default = clientMiddleware;