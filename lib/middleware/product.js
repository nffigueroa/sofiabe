'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('../util/common');

var _network = require('../network');

var middlewares = {
    getProducts: async function getProducts(req, res, next) {
        var idSucursal = req.params.idSucursal;
        var response = await (0, _network.callSPWithCallback)('Call IVN_llenarTabla_Producto(?)', idSucursal);
        return {
            status: 200,
            body: response
        };
    },
    deleteProduct: async function deleteProduct(req, res, next) {
        var idProducto = req.params.idProducto;
        var body = await (0, _network.callSPWithCallback)('Call IVN_eliminar_Producto(?)', idProducto).then(function (response) {
            return {
                status: 200,
                body: {
                    propertyRemoved: !!response
                }
            };
        }).catch(function (err) {
            return {
                status: 500,
                body: {
                    message: 'deleteProduct err: ' + err
                }
            };
        });
        return body;
    },
    saveProduct: async function saveProduct(req, res, next) {
        var product_body = req.body;

        var body = await (0, _network.callSPWithCallback)('Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)', product_body.product_name, (0, _common.getDateYYYYMMDD)(), product_body.product_creation_user, product_body.product_category, product_body.product_mark, product_body.product_measurement, product_body.product_presentation, product_body.product_id_sucursal).then(function (idProductoCreated) {
            return {
                status: 200,
                body: {
                    id_produccto: idProductoCreated[0].l_product_id
                }
            };
        }).catch(function (err) {
            return {
                status: 500,
                body: {
                    message: 'saveProduct failed err:' + err
                }
            };
        });
        return body;
    },
    updateProduct: async function updateProduct(req, res, next) {
        var product_body = req.body;
        (0, _common.registerMovements)({ id_usuario: product_body.product_creation_user, descripcion: 'updateProduct con id ' + product_body.product_id_producto });
        var response = await (0, _network.callSPWithCallback)('Call IVN_consultaActualizarProducto(?, ?, ?, ?, ?, ?)', [product_body.product_id_producto, product_body.product_name, product_body.product_category, product_body.product_mark, product_body.product_measurement, product_body.product_presentation]);
        return {
            status: 200,
            body: response
        };
    }
};

exports.default = middlewares;