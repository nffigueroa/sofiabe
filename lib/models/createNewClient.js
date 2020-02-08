"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateNewClient = exports.CreateNewClient = function () {
    function CreateNewClient(bodyClient) {
        _classCallCheck(this, CreateNewClient);

        this.idSucursal = bodyClient.idSucursal, this.nombre = bodyClient.nombre, this.apellido = bodyClient.apellido, this.telefono = bodyClient.telefono, this.direccion = bodyClient.direccion, this.mail = bodyClient.mail, this.id_ciudad = bodyClient.id_ciudad, this.id_usuario = bodyClient.id_usuario, this.iden = bodyClient.iden, this.tipoCliente = bodyClient.tipoCliente, this.declaraIva = bodyClient.declaraIva, this.declaraIca = bodyClient.declaraIca, this.reteFuente = bodyClient.reteFuente, this.milesIca = bodyClient.milesIca, this.dv = bodyClient.dv;
    }

    _createClass(CreateNewClient, [{
        key: "clientBody",
        get: function get() {
            return [this.idSucursal, this.nombre, this.apellido, this.telefono, this.direccion, this.mail, this.id_ciudad, this.id_usuario, this.iden, this.tipoCliente, this.declaraIva, this.declaraIca, this.reteFuente, this.milesIca, this.dv];
        }
    }]);

    return CreateNewClient;
}();