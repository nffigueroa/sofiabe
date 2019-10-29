const express = require('express')
import middlewares from './middleware/product';
import userMiddleware from './middleware/user';
import bodyParser from 'body-parser';


let app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });
app.get('/product/:idSucursal', middlewares.getProducts, (req, res) => {});
app.post('/product', (req, res) => { });
app.get('/product/:idProducto', (req, res) => { });
app.delete('/product/:idProducto', middlewares.deleteProduct, (req, res) => {});

app.post('/auth',userMiddleware.loginProcess, (req, res) => {}) ;
 
export default app;