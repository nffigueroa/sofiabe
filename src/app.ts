const express = require("express");
import middlewares from "./middleware/product";
import userMiddleware from "./middleware/user";
import * as bodyParser from "body-parser";
import clientMiddleware from "./middleware/client";
import otherMiddleWare from "./middleware/other";
import { Response } from "./middleware";
import { API_VERSION } from "./util/const";
import { middlewareProvider } from "./middleware/provider";
import { categoryMiddleWare } from "./middleware/category";
import { brandMiddleware } from "./middleware/brand";
import { presentationMiddleware } from "./middleware/presentation";
import { measurementMiddleWare } from "./middleware/measurement";

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("/*", (req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "access-token",
    "content-type",
    "Content-type,Accept,X-Custom-Header"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

/** Provider API */
app.get(`/${API_VERSION}/provider`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewareProvider.getProviders)
);
app.get(
  `/${API_VERSION}/provider/categories/:id_proveedor`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, middlewareProvider.getProviderCategories)
);
app.put(`/${API_VERSION}/provider`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewareProvider.updateProvider)
);
app.post(`/${API_VERSION}/provider`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewareProvider.insertProvider)
);
app.delete(
  `/${API_VERSION}/provider/:idProvider`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, middlewareProvider.deleteProvider)
);

/*Product API*/
app.get(`/${API_VERSION}/product`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewares.getProducts)
);
app.post(`/${API_VERSION}/product`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewares.saveProduct)
);
app.put(`/${API_VERSION}/product`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewares.updateProduct)
);
app.delete(
  `/${API_VERSION}/product/:idProducto`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, middlewares.deleteProduct)
);

/** Client API */
app.get(`/${API_VERSION}/client`, (req: any, res: any, next: any) =>
  Response(req, res, next, clientMiddleware.getClients)
);
app.delete(
  `/${API_VERSION}/client/:id_cliente`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, clientMiddleware.deleteClient)
);
app.post(`/${API_VERSION}/client/`, (req: any, res: any, next: any) =>
  Response(req, res, next, clientMiddleware.createNewClient)
);
app.put(`/${API_VERSION}/client`, (req: any, res: any, next: any) =>
  Response(req, res, next, clientMiddleware.updateClient)
);

/** User API */
app.post(`/${API_VERSION}/auth`, (req: any, res: any, next: any) =>
  Response(req, res, next, userMiddleware.loginProcess, false)
);

/** Category API */
app.get(`/${API_VERSION}/other/category`, (req: any, res: any, next: any) =>
  Response(req, res, next, categoryMiddleWare.getCategories)
);
app.post(`/${API_VERSION}/other/category`, (req: any, res: any, next: any) =>
  Response(req, res, next, categoryMiddleWare.insertCategory)
);
app.put(`/${API_VERSION}/other/category`, (req: any, res: any, next: any) =>
  Response(req, res, next, categoryMiddleWare.updateCategory)
);
app.delete(
  `/${API_VERSION}/other/category/:id_categoria`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, categoryMiddleWare.deleteCategory)
);
/** Brand API */
app.get(`/${API_VERSION}/other/brand`, (req: any, res: any, next: any) =>
  Response(req, res, next, brandMiddleware.getBrand)
);
app.post(`/${API_VERSION}/other/brand`, (req: any, res: any, next: any) =>
  Response(req, res, next, brandMiddleware.insertBrand)
);
app.put(`/${API_VERSION}/other/brand`, (req: any, res: any, next: any) =>
  Response(req, res, next, brandMiddleware.updatetBrand)
);
app.delete(`/${API_VERSION}/other/brand/:id_marca`, (req: any, res: any, next: any) =>
  Response(req, res, next, brandMiddleware.deletetBrand)
);

/** Presentation API */
app.get(`/${API_VERSION}/other/presentations`, (req: any, res: any, next: any) =>
  Response(req, res, next, presentationMiddleware.getPresentation)
);
app.post(`/${API_VERSION}/other/presentations`, (req: any, res: any, next: any) =>
  Response(req, res, next, presentationMiddleware.insertPresentation)
);
app.put(`/${API_VERSION}/other/presentations`, (req: any, res: any, next: any) =>
  Response(req, res, next, presentationMiddleware.updatetPresentacion)
);
app.delete(
  `/${API_VERSION}/other/presentations/:id_presentacion`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, presentationMiddleware.deletetPresentation)
);

/** Measurements API */

app.get(`/${API_VERSION}/other/measurements`, (req: any, res: any, next: any) =>
  Response(req, res, next, measurementMiddleWare.getMeasurements)
);
app.post(`/${API_VERSION}/other/measurements`, (req: any, res: any, next: any) =>
  Response(req, res, next, measurementMiddleWare.insertMeasurements)
);
app.put(`/${API_VERSION}/other/measurements`, (req: any, res: any, next: any) =>
  Response(req, res, next, measurementMiddleWare.updateMeasurements)
);
app.delete(`/${API_VERSION}/other/measurements/:id_medicion`, (req: any, res: any, next: any) =>
  Response(req, res, next, measurementMiddleWare.deleteMeasurements)
);


/** Others API */
app.get(`/${API_VERSION}/other/categories`, (req: any, res: any, next: any) =>
  Response(req, res, next, otherMiddleWare.getCategories)
);
app.get(`/${API_VERSION}/other/Brand`, (req: any, res: any, next: any) =>
  Response(req, res, next, otherMiddleWare.getBrand)
);
app.get(
  `/${API_VERSION}/other/presentations`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, otherMiddleWare.getPresentations)
);

app.get(`/${API_VERSION}/other/cities`, (req: any, res: any, next: any) =>
  Response(req, res, next, otherMiddleWare.getCities)
);
app.get(
  `/${API_VERSION}/other/company/sucursal`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, otherMiddleWare.getAllSucursalsByCompany)
);

export default app;
