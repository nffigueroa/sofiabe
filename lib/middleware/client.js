'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientMiddleware = {
    getClients: function getClients(req, res, next) {
        var idSucursal = req.params.idSucursal;
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call CLI_llenarTabla_Cliente(?)', idSucursal, function (err, result) {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            });
        });
        next();
    }
};

exports.default = clientMiddleware;