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
app.get('/product/:idSucursal', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _product2.default.getProducts);
});
app.post('/product', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _product2.default.saveProduct);
});
app.put('/product', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _product2.default.updateProduct);
});
//app.get('/product/:idProducto', (req, res, next) => Response(req, res, next ));
app.delete('/product/:idProducto', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _product2.default.deleteProduct);
});

/** Client API */
app.get('/client/:idSucursal', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _client2.default.getClients);
});
app.post('/client', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _client2.default.createNewClient);
});

/** User API */
app.post('/auth', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _user2.default.loginProcess);
});

/** Others API */
app.get('/other/categories', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _other2.default.getCategories);
});
app.get('/other/marks', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _other2.default.getMarks);
});
app.get('/other/presentations', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _other2.default.getPresentations);
});
app.get('/other/measurements', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _other2.default.getMeasurements);
});
app.get('/other/cities', function (req, res, next) {
  return (0, _middleware.Response)(req, res, next, _other2.default.getCities);
});

exports.default = app;