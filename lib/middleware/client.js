'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _network = require('../network');

var _createNewClient = require('../models/createNewClient');

var _response = require('../models/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientMiddleware = {
    getClients: async function getClients(req, res, next) {
        var idSucursal = req.params.idSucursal;
        var response = await (0, _network.callSPWithCallback)('Call CLI_llenarTabla_Cliente(?)', idSucursal).then(function (response) {
            return {
                status: 200,
                body: response
            };
        }).catch(function (err) {
            return {
                status: 500,
                body: {
                    message: 'getClients Err:' + err
                }
            };
        });
        return response;
    },
    createNewClient: async function createNewClient(req, res, next) {
        var bodyCereateNewClient = new _createNewClient.CreateNewClient(req.body);
        console.log(bodyCereateNewClient.clientBody);
        var response = await (0, _network.callSPWithCallback)('Call CLI_registrarCliente(?)', bodyCereateNewClient.clientBody).then(function (response) {
            return (0, _response.ResponseBodyBuilder)(200, false, response);
        }).catch(function (error) {
            return (0, _response.ResponseBodyBuilder)(500, false, error);
        });
        return response;
    }
};

exports.default = clientMiddleware;