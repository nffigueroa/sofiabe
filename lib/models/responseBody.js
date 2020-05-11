"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBodyBuilder = function (status, error, body) {
    var responseBody = {
        status: status,
        error: error,
        body: body
    };
    return responseBody;
};
