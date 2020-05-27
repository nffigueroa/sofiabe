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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("../network");
var bcrypt_1 = __importDefault(require("bcrypt"));
var responseBody_1 = require("../models/responseBody");
var const_1 = require("../util/const");
var common_1 = require("../util/common");
var jsonwebtoken_1 = require("jsonwebtoken");
var userMiddleware = {
    getPasswordByUserName: function (userName) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, network_1.callSPWithCallback("Call US_consultasPassword(?)", userName).then(function (dbResponse) {
                        return dbResponse[0] ? dbResponse[0].password : undefined;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    getUserProperties: function (userName) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, network_1.callSPWithCallback("Call US_consultasDatosLogeoUsuario(?)", userName).then(function (dbResponse) { return dbResponse[0]; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    loginProcess: function (_a, res, next) {
        var body = _a.body;
        return __awaiter(void 0, void 0, void 0, function () {
            var userName, password;
            return __generator(this, function (_b) {
                userName = body.userName, password = body.password;
                try {
                    return [2 /*return*/, userMiddleware
                            .getPasswordByUserName(userName)
                            .then(function (passwordFromBd) { return __awaiter(void 0, void 0, void 0, function () {
                            var matches, userProperties;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!passwordFromBd) {
                                            return [2 /*return*/, responseBody_1.ResponseBodyBuilder(401, false, {
                                                    message: "Not authtorized",
                                                })];
                                        }
                                        return [4 /*yield*/, bcrypt_1.default.compare(password, passwordFromBd)];
                                    case 1:
                                        matches = _a.sent();
                                        if (!matches) return [3 /*break*/, 3];
                                        return [4 /*yield*/, userMiddleware.getUserProperties(userName)];
                                    case 2:
                                        userProperties = _a.sent();
                                        return [2 /*return*/, responseBody_1.ResponseBodyBuilder(200, false, __assign({
                                                nombre_usuario: userProperties.nombre_usuario,
                                                apellido_usuario: userProperties.apellido_usuario,
                                                cc_usuario: userProperties.telefono_usuario,
                                                telefono_usuario: userProperties.telefono_usuario,
                                                token: common_1.sign(Object.assign({}, userProperties)),
                                            }))];
                                    case 3: return [2 /*return*/, responseBody_1.ResponseBodyBuilder(401, true, {
                                            message: "Invalid credentials",
                                        })];
                                }
                            });
                        }); })];
                }
                catch (err) {
                    return [2 /*return*/, responseBody_1.ResponseBodyBuilder(500, true, { message: err.message })];
                }
                return [2 /*return*/];
            });
        });
    },
    getUserByCompany: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_empresa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_empresa = jsonwebtoken_1.decode(token).data.id_empresa;
                    return [4 /*yield*/, network_1.callSPWithCallback("CALL US_consultaLlenarTabla_Usuario(?)", id_empresa)
                            .then(function (data) { return responseBody_1.ResponseBodyBuilder(200, false, data); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    insertUserProperties: function (req, token) { return __awaiter(void 0, void 0, void 0, function () {
        var id_usuario, newUser, _a, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id_usuario = jsonwebtoken_1.decode(token).data.id_usuario;
                    newUser = req.body;
                    _a = newUser;
                    return [4 /*yield*/, bcrypt_1.default.hash(newUser.password, const_1.SALTROUNDS)];
                case 1:
                    _a.password = _b.sent();
                    return [4 /*yield*/, network_1.callSPWithCallback("CALL US_consultaInstertarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", newUser.nombre_usuario, newUser.apellido_usuario, newUser.cc_usuario, newUser.telefono_usuario, newUser.direccion_usuario, newUser.id_cargo, newUser.descripcion, common_1.getDateYYYYMMDD(), id_usuario, newUser.id_sucursal, newUser.usuario, newUser.password)
                            .then(function (data) { return responseBody_1.ResponseBodyBuilder(200, false, data); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 2:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    updateUserProperties: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, _a, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    newUser = req.body;
                    _a = newUser;
                    return [4 /*yield*/, bcrypt_1.default.hash(newUser.password, const_1.SALTROUNDS)];
                case 1:
                    _a.password = _b.sent();
                    return [4 /*yield*/, network_1.callSPWithCallback("CALL US_consultaModificarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", newUser.id_usuario, newUser.nombre_usuario, newUser.apellido_usuario, newUser.cc_usuario, newUser.telefono_usuario, newUser.direccion_usuario, newUser.id_cargo, newUser.descripcion, newUser.id_sucursal, newUser.usuario, newUser.password)
                            .then(function (data) { return responseBody_1.ResponseBodyBuilder(200, false, data); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 2:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
    deleteUser: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var id_usuario, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_usuario = req.params.idUsuario;
                    return [4 /*yield*/, network_1.callSPWithCallback("CALL US_eliminarUsuario(?)", id_usuario)
                            .then(function (data) { return responseBody_1.ResponseBodyBuilder(200, false, data); })
                            .catch(function (err) { return responseBody_1.ResponseBodyBuilder(500, true, err); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    }); },
};
exports.default = userMiddleware;
