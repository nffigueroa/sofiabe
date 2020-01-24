'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _common = require('../util/common');

var _common2 = require('../../lib/util/common');

var _network = require('../network');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = {
    getProducts: function getProducts(req, res, next) {
        var idSucursal = req.params.idSucursal;

        (0, _network.callSPWithCallback)('Call IVN_llenarTabla_Producto(?)', function (response) {
            console.log(response);res.send(response);
        }, idSucursal);
        next();
    },
    deleteProduct: function deleteProduct(req, res, next) {
        var idProducto = req.params.idProducto;

        (0, _network.callSPWithCallback)('Call IVN_eliminar_Producto(?)', function (response) {
            return res.send(response);
        }, [idProducto]);

        next();
    },
    saveProduct: function saveProduct(req, res, next) {
        var product_body = req.body;

        (0, _network.callSPWithCallback)('Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)', function (response) {
            return res.send(response);
        }, [product_body.product_name, (0, _common.getDateYYYYMMDD)(), product_body.product_creation_user, product_body.product_category, product_body.product_mark, product_body.product_measurement, product_body.product_presentation, product_body.product_id_sucursal]);

        next();
    },
    updateProduct: function updateProduct(req, res, next) {
        var product_body = req.body;
        (0, _common2.registerMovements)({ id_usuario: product_body.product_creation_user, descripcion: 'updateProduct con id ' + product_body.product_id_producto });
        (0, _network.callSPWithCallback)('Call IVN_consultaActualizarProducto(?, ?, ?, ?, ?, ?)', function (response) {
            return res.send(response);
        }, [product_body.product_id_producto, product_body.product_name, product_body.product_category, product_body.product_mark, product_body.product_measurement, product_body.product_presentation]);
        next();
    }
};

exports.default = middlewares;