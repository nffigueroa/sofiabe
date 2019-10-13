const express = require('express')
const mysql = require('mysql')
var {getProducts, deleteProduct} = require('./middleware/product')


var app = express()

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  
  });

app.get('/product', getProducts, function(req, res) { });
app.post('/product', function(req, res) { });
app.get('/product/:idProducto', function(req, res) { });
app.delete('/product/:idProducto', deleteProduct, function (req, res) {});


module.exports = app