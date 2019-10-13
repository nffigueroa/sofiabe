'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = require('./middleware/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');


var app = express();

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.get('/product', _product2.default.getProducts, function (req, res) {});
app.post('/product', function (req, res) {});
app.get('/product/:idProducto', function (req, res) {});
app.delete('/product/:idProducto', _product2.default.deleteProduct, function (req, res) {});

exports.default = app;