'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.middlewareInventory = undefined;

var _createProductInInventory = require('../models/createProductInInventory');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var middlewareInventory = exports.middlewareInventory = {
    getQuantityAndProductCost: async function getQuantityAndProductCost() {
        var idSucursal = req.params.idSucursal;

        var response = await callSPWithCallback('Call IVN_consultaCantidadYCostoProducto(?)', idSucursal).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    insertQuantityProductInInventory: async function insertQuantityProductInInventory() {
        var _req$body = req.body,
            cantidad = _req$body.cantidad,
            id_producto = _req$body.id_producto;

        var response = await callSPWithCallback('Call IVN_consultaCantidadYCostoProducto(?, ?)', [cantidad, id_producto]).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    insertDiscountInProduct: async function insertDiscountInProduct() {
        var _req$body2 = req.body,
            cantidad = _req$body2.cantidad,
            id_producto = _req$body2.id_producto,
            id_usuario = _req$body2.id_usuario,
            motivo = _req$body2.motivo;

        var response = await callSPWithCallback('Call CON_consultaRegistrarDescuentoProducto(?, ?, ?, ?)', [cantidad, id_producto, id_usuario, motivo]).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    getInventory: async function getInventory() {
        var idSucursal = req.params.idSucursal;

        var response = await callSPWithCallback('Call IVN_llenarTabla_inventario(?)', idSucursal).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    insertProductIntoInventory: async function insertProductIntoInventory(req) {
        var newinventoryProduct = new _createProductInInventory.CreateProductInventory(req.body);
        var response = await callSPWithCallback('Call IVN_consultaRegistrarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)', newinventoryProduct).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    getIdProductByname: async function getIdProductByname() {
        var producto = req.body.producto;

        var response = await callSPWithCallback('Call IVN_consultaIdProducto(?)', producto).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    updateInventoryProduct: async function updateInventoryProduct() {
        var json = {
            id_producto: id_producto,
            cantidad: cantidad,
            stock: stock,
            id_sucursal: id_sucursal,
            id_proveedor: id_proveedor,
            barras: barras,
            precio1: precio1,
            precio2: precio2,
            iva: iva,
            expiracion: expiracion,
            id_usuario: id_usuario,
            id_producto_inventario: id_producto_inventario
        };
        var updateProduct = Object.assign(json, req.body);
        var response = await callSPWithCallback('Call IVN_consultaActualizarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)', [].concat(_toConsumableArray(updateProduct))).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    removeInventoryproduct: async function removeInventoryproduct() {
        var idProducto = req.body.idProducto;

        var response = await callSPWithCallback('Call IVN_consultaEliminarProductoInventario(?)', idProducto).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    },
    registerDeletedProduct: async function registerDeletedProduct() {
        var _req$body3 = req.body,
            id_producto_inventario = _req$body3.id_producto_inventario,
            descripcion = _req$body3.descripcion,
            id_usuario = _req$body3.id_usuario,
            id_motivo = _req$body3.id_motivo;

        var response = await callSPWithCallback('Call GEN_consultaRegistrarProductoEliminado(?, ?, ?, ?)', [id_producto_inventario, descripcion, id_usuario, id_motivo]).then(function (response) {
            return ResponseBodyBuilder(200, false, response);
        }).catch(function (err) {
            return ResponseBodyBuilder(500, true, err);
        });
        return response;
    }
};