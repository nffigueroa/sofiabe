"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateProductInventory = exports.CreateProductInventory = function () {
    function CreateProductInventory(bodyProduct) {
        _classCallCheck(this, CreateProductInventory);

        this.id_producto = bodyProduct.id_producto;
        this.cantidad = bodyProduct.cantidad;
        this.stock = bodyProduct.stock;
        this.id_sucursal = bodyProduct.id_sucursal;
        this.id_proveedor = bodyProduct.id_proveedor;
        this.barras = bodyProduct.barras;
        this.precio1 = bodyProduct.precio1;
        this.precio2 = bodyProduct.precio2;
        this.iva = bodyProduct.iva;
        this.expiracion = bodyProduct.expiracion;
        this.id_usuario = bodyProduct.id_usuario;
        this.utilidad = bodyProduct.utilidad;
        this.fecha_creacion = bodyProduct.fecha_creacion;
    }

    _createClass(CreateProductInventory, [{
        key: "dataAsArray",
        get: function get() {
            [].concat(_toConsumableArray(this));
        }
    }]);

    return CreateProductInventory;
}();