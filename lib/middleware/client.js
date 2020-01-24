'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _network = require('../network');

var _createNewClient = require('../models/createNewClient');

var clientMiddleware = {
    getClients: function getClients(req, res, next) {
        var idSucursal = req.params.idSucursal;
        (0, _network.callSPWithCallback)('Call CLI_llenarTabla_Cliente(?)', function (response) {
            return res.send(response);
        }, idSucursal);
        next();
    },
    createNewClient: function createNewClient(req, res, next) {
        var idSucursal = req.params.idSucursal;
        var bodyCereateNewClient = new _createNewClient.CreateNewClient(req.body);
        console.log(bodyCereateNewClient);
        (0, _network.callSPWithCallback)('Call CLI_registrarCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', function (response) {
            return res.send(response);
        }, []);
        next();
    }
};

exports.default = clientMiddleware;