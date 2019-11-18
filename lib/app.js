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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');


var app = express();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

/*Product API*/
app.get('/product/:idSucursal', _product2.default.getProducts, function (req, res) {});
app.post('/product', _product2.default.saveProduct, function (req, res) {});
app.get('/product/:idProducto', function (req, res) {});
app.delete('/product/:idProducto', _product2.default.deleteProduct, function (req, res) {});

/** Client API */
app.get('/client/:idSucursal', _client2.default.getClients, function (req, res) {});
app.post('/auth', _user2.default.loginProcess, function (req, res) {});

/** Others API */
app.get('/other/categories', _other2.default.getCategories, function (req, res) {});
app.get('/other/marks', _other2.default.getMarks, function (req, res) {});
app.get('/other/presentations', _other2.default.getPresentations, function (req, res) {});
app.get('/other/measurements', _other2.default.getMeasurements, function (req, res) {});

exports.default = app;