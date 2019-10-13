'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = {
    getProducts: function getProducts(req, res, next) {
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call IVN_llenarTabla_Producto(?)', [1], function (err, result) {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            });
        });
    },
    deleteProduct: function deleteProduct(req, res, next) {
        var idProducto = req.params.idProducto;
        console.log('Se intenta eliminar el idProducto' + idProducto);
        _mysql2.default.getConnection(function (err, connection) {
            connection.query('Call IVN_eliminar_Producto(?)', [idProducto], function (err, result) {
                if (err) {
                    res.send(JSON.stringify({
                        deleted: false,
                        err: err
                    }));
                }
            });
        });
    }
};

exports.default = middlewares;