const express = require('express')
import middlewares from './middleware/product';
import userMiddleware from './middleware/user';
import bodyParser from 'body-parser';
import clientMiddleware from './middleware/client';
import otherMiddleWare from './middleware/other';


let app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });

  /*Product API*/
app.get('/product/:idSucursal', middlewares.getProducts, (req, res) => {});
app.post('/product', middlewares.saveProduct, (req, res) => { });
app.put('/product', middlewares.updateProduct, (req, res) => { });
app.get('/product/:idProducto', (req, res) => { });
app.delete('/product/:idProducto', middlewares.deleteProduct, (req, res) => {});


/** Client API */
app.get('/client/:idSucursal', clientMiddleware.getClients, (req, res) => {});
app.post('/client/:idSucursal', clientMiddleware.createNewClient, (req, res) => {}) ;


/** User API */
app.post('/auth',userMiddleware.loginProcess, (req, res) => {}) ;

/** Others API */
app.get('/other/categories', otherMiddleWare.getCategories, (req, res) => {});
app.get('/other/marks', otherMiddleWare.getMarks, (req, res) => {});
app.get('/other/presentations', otherMiddleWare.getPresentations, (req, res) => {});
app.get('/other/measurements', otherMiddleWare.getMeasurements, (req, res) => {});
 
export default app;