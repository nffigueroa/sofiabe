const express = require('express')
import middlewares from './middleware/product';
import userMiddleware from './middleware/user';
import bodyParser from 'body-parser';
import clientMiddleware from './middleware/client';
import otherMiddleWare from './middleware/other';
import { Response } from './middleware';


let app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });

  /*Product API*/
app.get('/product/:idSucursal',(req, res, next) => Response(req, res, next, middlewares.getProducts));
app.post('/product', (req, res, next) => Response(req, res, next, middlewares.saveProduct));
app.put('/product', (req, res, next) => Response(req, res, next,  middlewares.updateProduct));
//app.get('/product/:idProducto', (req, res, next) => Response(req, res, next ));
app.delete('/product/:idProducto', (req, res, next) => Response(req, res, next, middlewares.deleteProduct));


/** Client API */
app.get('/client/:idSucursal', (req, res, next) => Response(req, res, next, clientMiddleware.getClients));
app.delete('/client/:idClient', (req, res, next) => Response(req, res, next, clientMiddleware.deleteclient));
app.post('/client', (req, res, next) => Response(req, res, next, clientMiddleware.createNewClient));


/** User API */
app.post('/auth', (req, res, next) => Response(req, res, next, userMiddleware.loginProcess)) ;

/** Others API */
app.get('/other/categories', (req, res, next) => Response(req, res, next, otherMiddleWare.getCategories));
app.get('/other/marks', (req, res, next) => Response(req, res, next, otherMiddleWare.getMarks));
app.get('/other/presentations', (req, res, next) => Response(req, res, next, otherMiddleWare.getPresentations));
app.get('/other/measurements', (req, res, next) => Response(req, res, next, otherMiddleWare.getMeasurements));
app.get('/other/cities', (req, res, next) => Response(req, res, next, otherMiddleWare.getCities));
 
export default app;