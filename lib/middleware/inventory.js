"use strict";
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
var responseBody_1 = require("../models/responseBody");
var network_1 = require("../network");
var jsonwebtoken_1 = require("jsonwebtoken");
exports.middlewareInventory = {
    getQuantityAndProductCost: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var idSucursal, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idSucursal = req.params.idSucursal;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaCantidadYCostoProducto(?)", idSucursal)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertQuantityProductInInventory: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cantidad, id_producto, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, cantidad = _a.cantidad, id_producto = _a.id_producto;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaCantidadYCostoProducto(?, ?)", cantidad, id_producto)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertDiscountInProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cantidad, id_producto, id_usuario, motivo, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, cantidad = _a.cantidad, id_producto = _a.id_producto, id_usuario = _a.id_usuario, motivo = _a.motivo;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call CON_consultaRegistrarDescuentoProducto(?, ?, ?, ?)", cantidad, id_producto, id_usuario, motivo)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    getInventory: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_sucursal, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_sucursal = req.params.id_sucursal;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_llenarTabla_inventario(?)", id_sucursal)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertProductIntoInventory: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var newinventoryProduct, _a, id_sucursal, id_usuario, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    newinventoryProduct = req.body;
                    _a = jsonwebtoken_1.decode(token).data, id_sucursal = _a.id_sucursal, id_usuario = _a.id_usuario;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaRegistrarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)", newinventoryProduct.id_producto, newinventoryProduct.cantidad, newinventoryProduct.stock, id_sucursal, newinventoryProduct.id_proveedor, newinventoryProduct.barras, newinventoryProduct.precio1, newinventoryProduct.precio2, newinventoryProduct.iva, newinventoryProduct.expiracion, id_usuario)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    getIdProductByname: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var producto, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    producto = req.body.producto;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaIdProducto(?)", producto)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    updateInventoryProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var updateProduct, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateProduct = req.body;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaActualizarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)", updateProduct)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    removeInventoryproduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var idProducto, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProducto = req.body.idProducto;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaEliminarProductoInventario(?)", idProducto)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertDeletedProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id_producto_inventario, descripcion, id_usuario, id_motivo, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id_producto_inventario = _a.id_producto_inventario, descripcion = _a.descripcion, id_usuario = _a.id_usuario, id_motivo = _a.id_motivo;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_consultaRegistrarProductoEliminado(?, ?, ?, ?)", [id_producto_inventario, descripcion, id_usuario, id_motivo])
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    getFullInventoryByCompany: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var idEmpresa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idEmpresa = req.body.idEmpresa;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_llenarTabla_inventarioStock(?)", idEmpresa)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
};
