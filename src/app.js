const express = require('express')
import middlewares from './middleware/product';
import userMiddleware from './middleware/user';
import bodyParser from 'body-parser';
import clientMiddleware from './middleware/client';
import otherMiddleWare from './middleware/other';
import { Response } from './middleware';
import { API_VERSION } from './util/const';


let app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });

  /*Product API*/
app.get(`${API_VERSION}/product/:idSucursal`,(req, res, next) => Response(req, res, next, middlewares.getProducts));
app.post(`${API_VERSION}/product`, (req, res, next) => Response(req, res, next, middlewares.saveProduct));
app.put(`${API_VERSION}/product`, (req, res, next) => Response(req, res, next,  middlewares.updateProduct));
//app.get(`${API_VERSION}` + '/product/:idProducto', (req, res, next) => Response(req, res, next ));
app.delete(`${API_VERSION}/product/:idProducto`, (req, res, next) => Response(req, res, next, middlewares.deleteProduct));


/** Client API */
app.get(`${API_VERSION}/client/:idSucursal`, (req, res, next) => Response(req, res, next, clientMiddleware.getClients));
app.delete(`${API_VERSION}/client/:idClient`, (req, res, next) => Response(req, res, next, clientMiddleware.deleteClient));
app.post(`${API_VERSION}/client`, (req, res, next) => Response(req, res, next, clientMiddleware.createNewClient));


/** User API */
app.post(`${API_VERSION}/auth`, (req, res, next) => Response(req, res, next, userMiddleware.loginProcess)) ;

/** Others API */
app.get(`${API_VERSION}/other/categories`, (req, res, next) => Response(req, res, next, otherMiddleWare.getCategories));
app.get(`${API_VERSION}/other/marks`, (req, res, next) => Response(req, res, next, otherMiddleWare.getMarks));
app.get(`${API_VERSION}/other/presentations`, (req, res, next) => Response(req, res, next, otherMiddleWare.getPresentations));
app.get(`${API_VERSION}/other/measurements`, (req, res, next) => Response(req, res, next, otherMiddleWare.getMeasurements));
app.get(`${API_VERSION}/other/cities`, (req, res, next) => Response(req, res, next, otherMiddleWare.getCities));
 
export default app;