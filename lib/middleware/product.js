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
var common_1 = require("../util/common");
var network_1 = require("../network");
var responseBody_1 = require("../models/responseBody");
var jsonwebtoken_1 = require("jsonwebtoken");
var middlewares = {
    getProducts: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_sucursal, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_sucursal = jsonwebtoken_1.decode(token).data.id_sucursal;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_llenarTabla_Producto(?)", id_sucursal)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, responseBody_1.ResponseBodyBuilder(200, false, response)];
            }
        });
    }); },
    deleteProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var idProducto, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProducto = req.params.idProducto;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_eliminar_Producto(?)", idProducto)
                            .then(function (response) {
                            return responseBody_1.ResponseBodyBuilder(200, false, {
                                propertyRemoved: !!response,
                            });
                        })
                            .catch(function (err) {
                            return responseBody_1.ResponseBodyBuilder(500, true, {
                                message: "deleteProduct err: " + err,
                            });
                        })];
                case 1:
                    body = _a.sent();
                    return [2 /*return*/, body];
            }
        });
    }); },
    saveProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var id_sucursal, product_body, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_sucursal = req.param.idSucursal;
                    product_body = req.body;
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)", product_body.nombre_producto, common_1.getDateYYYYMMDD(), product_body.id_usuario, product_body.id_categoria, product_body.id_marca, product_body.id_medicion, product_body.id_presentacion, id_sucursal)
                            .then(function (idProductoCreated) {
                            return responseBody_1.ResponseBodyBuilder(200, false, __assign({}, idProductoCreated[0]));
                        })
                            .catch(function (err) {
                            return responseBody_1.ResponseBodyBuilder(500, true, {
                                message: "saveProduct failed err:" + err,
                            });
                        })];
                case 1:
                    body = _a.sent();
                    return [2 /*return*/, body];
            }
        });
    }); },
    updateProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var product_body, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product_body = req.body;
                    console.log(product_body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    common_1.registerMovements({
                        proccess: "updateProduct",
                        id_usuario: product_body.id_usuario,
                        descripcion: "updateProduct con id " + product_body.id_Produccto,
                    });
                    return [4 /*yield*/, network_1.callSPWithCallback("Call IVN_consultaActualizarProducto(?, ?, ?, ?, ?, ?)", product_body.id_Produccto, product_body.nombre_producto, product_body.id_categoria, product_body.id_marca, product_body.id_medicion, product_body.id_presentacion)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, {
                            status: 200,
                            body: response,
                        }];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = middlewares;
