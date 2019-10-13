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

app.get('/product/:idSucursal', _product2.default.getProducts, function (req, res) {});
app.post('/product', function (req, res) {});
app.get('/product/:idProducto', function (req, res) {});
app.delete('/product/:idProducto', _product2.default.deleteProduct, function (req, res) {});

app.post('/auth', _user2.default.loginProcess, function (req, res) {});

exports.default = app;