'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _product = require('./middleware/product');

var _product2 = _interopRequireDefault(_product);

var _user = require('./middleware/user');

var _user2 = _interopRequireDefault(_user);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _client = require('./middleware/client');

var _client2 = _interopRequireDefault(_client);

var _other = require('./middleware/other');

var _other2 = _interopRequireDefault(_other);

var _middleware = require('./middleware');

var _const = require('./util/const');

var _provider = require('./middleware/provider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');


var app = express();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

/** Provider API */
app.get('/' + _const.API_VERSION + '/provider/:idSucursal', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _provider.middlewareProvider.getProviders);
});

/*Product API*/
app.get('/' + _const.API_VERSION + '/product/:idSucursal', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _product2.default.getProducts);
});
app.post('/' + _const.API_VERSION + '/product', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _product2.default.saveProduct);
});
app.put('/' + _const.API_VERSION + '/product', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _product2.default.updateProduct);
});
app.delete('/' + _const.API_VERSION + '/product/:idProducto', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _product2.default.deleteProduct);
});

/** Client API */
app.get('/' + _const.API_VERSION + '/client/:idSucursal', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _client2.default.getClients);
});
app.delete('/' + _const.API_VERSION + '/client/:idClient', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _client2.default.deleteClient);
});
app.post('/' + _const.API_VERSION + '/client', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _client2.default.createNewClient);
});
app.put('/' + _const.API_VERSION + '/client', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _client2.default.createNewClient);
});

/** User API */
app.post('/' + _const.API_VERSION + '/auth', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _user2.default.loginProcess);
});

/** Others API */
app.get('/' + _const.API_VERSION + '/other/categories', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _other2.default.getCategories);
});
app.get('/' + _const.API_VERSION + '/other/marks', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _other2.default.getMarks);
});
app.get('/' + _const.API_VERSION + '/other/presentations', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _other2.default.getPresentations);
});
app.get('/' + _const.API_VERSION + '/other/measurements', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _other2.default.getMeasurements);
});
app.get('/' + _const.API_VERSION + '/other/cities', function (req, res, next) {
    return (0, _middleware.Response)(req, res, next, _other2.default.getCities);
});

exports.default = app;