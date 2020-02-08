"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Response = exports.Response = async function Response(req, res, next, middleware) {
    try {
        var middleWareResponse = await middleware(req, res, next);
        if ([200, 201].find(function (element) {
            return element === middleWareResponse.status;
        }) !== -1) {
            res.send({
                status: middleWareResponse.status,
                error: false,
                body: middleWareResponse.body
            });
        } else {
            res.send({
                status: middleWareResponse.status,
                error: true,
                body: middleWareResponse.body
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: true,
            body: error
        });
    }
};