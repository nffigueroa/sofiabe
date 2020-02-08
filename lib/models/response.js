"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ResponseBodyBuilder = exports.ResponseBodyBuilder = function ResponseBodyBuilder() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return {
        status: status,
        error: error,
        body: body
    };
};