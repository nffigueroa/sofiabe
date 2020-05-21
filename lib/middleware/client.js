"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("../network");
var responseBody_1 = require("../models/responseBody");
var jsonwebtoken_1 = require("jsonwebtoken");
var clientMiddleware = {
    getClients: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_sucursal, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_sucursal = jsonwebtoken_1.decode(token).data.id_sucursal;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call CLI_llenarTabla_Cliente(?)", id_sucursal)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) {
                            return responseBody_1.ResponseBodyBuilder(500, true, { message: "getClients Err:" + err });
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    createNewClient: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var bodyCereateNewClient, _a, id_usuario, id_sucursal, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    bodyCereateNewClient = req.body;
                    _a = jsonwebtoken_1.decode(token).data, id_usuario = _a.id_usuario, id_sucursal = _a.id_sucursal;
                    bodyCereateNewClient.id_usuario = id_usuario;
                    bodyCereateNewClient.id_sucursal = id_sucursal;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call CLI_registrarCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", bodyCereateNewClient.id_sucursal, bodyCereateNewClient.nombre_cliente, bodyCereateNewClient.apellido_cliente, bodyCereateNewClient.telefono_cliente, bodyCereateNewClient.direccion_cliente, bodyCereateNewClient.mail_cliente, bodyCereateNewClient.id_ciudad, bodyCereateNewClient.id_usuario, bodyCereateNewClient.cedula_cliente, bodyCereateNewClient.esJuridico, bodyCereateNewClient.declaraIva, bodyCereateNewClient.declaraIca, bodyCereateNewClient.reteFuente, bodyCereateNewClient.milesIca, bodyCereateNewClient.dv)
                            .then(function (response) {
                            //registerMovements({process: 'createNewClient', id_usuario:  bodyCereateNewClient.id_usuario, descripcion: `Registro de cliente exitoso id_cliente: ${response.id_cliente}`})
                            return responseBody_1.ResponseBodyBuilder(200, false, __assign({}, response[0]));
                        })
                            .catch(function (error) { return responseBody_1.ResponseBodyBuilder(500, false, error); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    deleteClient: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var idClient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idClient = req.params.id_cliente;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call CLI_eliminar_Cliente(?)", idClient)
                            .then(function (response) {
                            if (response) {
                                return responseBody_1.ResponseBodyBuilder(200, false, !!response);
                            }
                            else {
                                return responseBody_1.ResponseBodyBuilder(404, true, "Can not find id " + idClient);
                            }
                        })
                            .catch(function (error) { return responseBody_1.ResponseBodyBuilder(500, false, error); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    updateClient: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var clientUpdated, _a, id_usuario, id_sucursal, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    clientUpdated = req.body;
                    _a = jsonwebtoken_1.decode(token).data, id_usuario = _a.id_usuario, id_sucursal = _a.id_sucursal;
                    clientUpdated.id_usuario = id_usuario;
                    clientUpdated.id_sucursal = id_sucursal;
                    console.log(req.body);
                    return [4 /*yield*/, network_1.callSPWithCallback("Call CLI_consultaActualizarCliente(?, ?, ? , ?, ? , ? , ? , ? , ? , ? , ? , ?)", clientUpdated.id_usuario, clientUpdated.id_cliente, clientUpdated.nombre_cliente, clientUpdated.apellido_cliente, clientUpdated.cedula_cliente, clientUpdated.mail_cliente, clientUpdated.direccion_cliente, clientUpdated.telefono_cliente, clientUpdated.id_ciudad, clientUpdated.id_sucursal, clientUpdated.esJuridico, clientUpdated.dv)
                            .then(function (response) {
                            if (!response) {
                                return responseBody_1.ResponseBodyBuilder(200, false, !!response);
                            }
                            else {
                                return responseBody_1.ResponseBodyBuilder(404, true, "Can not find id " + clientUpdated.id_cliente);
                            }
                        })
                            .catch(function (error) { return responseBody_1.ResponseBodyBuilder(500, false, error); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
};
exports.default = clientMiddleware;
