'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _common = require('../util/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = {
    getProducts: function getProducts(req, res, next) {
        var idSucursal = req.params.idSucursal;
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call IVN_llenarTabla_Producto(?)', idSucursal, function (err, result) {
                if (err) throw err;
                res.send(result[0]);
            });
        });
        next();
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
    },
    saveProduct: function saveProduct(req, res, next) {
        console.log(req.body);
        var product_body = req.body;
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)', [product_body.product_name, (0, _common.getDateYYYYMMDD)(), product_body.product_creation_user, product_body.product_category, product_body.product_mark, product_body.product_measurement, product_body.product_presentation, product_body.product_id_sucursal], function (err, result) {
                if (err) throw err;
                res.send(result[0]);
            });
        });
        next();
    }
};

exports.default = middlewares;