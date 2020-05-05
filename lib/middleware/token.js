"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../util/common");
exports.verifyToken = function (req, res, checkToken) {
    var token = req.headers['access-token'];
    if (!token && checkToken) {
        return false;
    }
    if (token && checkToken) {
        return !!common_1.verifyJWT(token);
    }
    return true;
};
