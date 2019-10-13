const express = require('express')
import middlewares from './middleware/product';


let app = express()

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  
  });

app.get('/product', middlewares.getProducts, (req, res) => {});
app.post('/product', (req, res) => { });
app.get('/product/:idProducto', (req, res) => { });
app.delete('/product/:idProducto', middlewares.deleteProduct, (req, res) => {});
 
export default app;