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
var network_1 = require("../network");
var responseBody_1 = require("../models/responseBody");
var common_1 = require("../util/common");
var jsonwebtoken_1 = require("jsonwebtoken");
exports.middlewareProvider = {
    getProviders: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_sucursal, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_sucursal = jsonwebtoken_1.decode(token).data.id_sucursal;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call PRO_consultaLlenarTablaProveedor(?)", id_sucursal)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertProvider: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var newProvider, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newProvider = req.body;
                    newProvider.fecha_crea = common_1.getDateYYYYMMDD();
                    return [4 /*yield*/, network_1.callSPWithCallback("Call PRO_consultaInsertarProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", newProvider.empresa, newProvider.contaco_empresa, newProvider.telefono_proveedor, newProvider.direccion_proveedor, newProvider.mail_proveedor, newProvider.id_ciudad, newProvider.nit_proveedor, newProvider.id_usuario, newProvider.fecha_crea, newProvider.id_sucursal)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    updateProvider: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var provider, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = req.body;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_consultaModificarProveedor(?,?,?,?,?,?,?,?)", provider.id_proveedor, provider.empresa, provider.contaco_empresa, provider.telefono_proveedor, provider.direccion_proveedor, provider.mail_proveedor, provider.id_ciudad, provider.nit_proveedor)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    getProviderCategories: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_proveedor, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_proveedor = req.params.id_proveedor;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_CategoriasProveedorConsultar(?)", id_proveedor)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    deleteProvider: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var idProvider, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProvider = req.params.idProvider;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_eliminar_proveedor(?)", idProvider)
                            .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    updateProviderCategory: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, categories, nitProveedor, id_proveedor, categoriesClear, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, categories = _a.categories, nitProveedor = _a.nitProveedor;
                    return [4 /*yield*/, exports.middlewareProvider.getIdProviderByNit(nitProveedor)];
                case 1:
                    id_proveedor = (_b.sent());
                    return [4 /*yield*/, exports.middlewareProvider.deleteAllProviderCategories(id_proveedor)];
                case 2:
                    categoriesClear = _b.sent();
                    return [4 /*yield*/, exports.middlewareProvider.insertCategoriesProvider(categories, id_proveedor)];
                case 3:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    getAllProviders: function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_consultaLlenarComboProveedor()")
                        .then(function (response) { return responseBody_1.ResponseBodyBuilder(200, false, response); })
                        .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    getIdProviderByNit: function (nit) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_consultaSelectProveedor(?)", nit)
                        .then(function (response) { return response; })
                        .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    deleteAllProviderCategories: function (id_proveedor) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, network_1.callSPWithCallback("Call GEN_eliminar_Categoria_Proveedor(?)", id_proveedor)
                        .then(function (response) { return response; })
                        .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertCategoriesProvider: function (categories, id_proveedor) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            categories.map(function (ids) { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network_1.callSPWithCallback("call GEN_registrarCategoriaProveedor(?)", [ids, id_proveedor])];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); },
};
