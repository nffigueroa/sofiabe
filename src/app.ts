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
import { middlewareInventory } from "./middleware/inventory";
import { billMiddleware } from "./middleware/bill";

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("/*", (req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"
  );
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

/** Bill API */
app.get(`/${API_VERSION}/bill`, (req: any, res: any, next: any) =>
  Response(req, res, next, billMiddleware.getBillTable)
);

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

/** Inventory API */
app.get(`/${API_VERSION}/inventory`, (req: any, res: any, next: any) =>
  Response(req, res, next, middlewareInventory.getInventory)
);
app.post(
  `/${API_VERSION}/inventory/register`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, middlewareInventory.insertProductIntoInventory)
);

app.get(`/${API_VERSION}/inventory/bill/:idFactura/articles`, (req: any, res: any, next: any) => Response(req, res, next, middlewareInventory.getArticlesByBill))

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
app.get(`/${API_VERSION}/user`, (req: any, res: any, next: any) =>
  Response(req, res, next, userMiddleware.getUserByCompany)
);
app.post(`/${API_VERSION}/user`, (req: any, res: any, next: any) =>
  Response(req, res, next, userMiddleware.insertUserProperties)
);
app.put(`/${API_VERSION}/user`, (req: any, res: any, next: any) =>
  Response(req, res, next, userMiddleware.updateUserProperties)
);
app.delete(`/${API_VERSION}/user/:idUsuario`, (req: any, res: any, next: any) =>
  Response(req, res, next, userMiddleware.deleteUser)
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
app.delete(
  `/${API_VERSION}/other/brand/:id_marca`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, brandMiddleware.deletetBrand)
);

/** Presentation API */
app.get(
  `/${API_VERSION}/other/presentations`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, presentationMiddleware.getPresentation)
);
app.post(
  `/${API_VERSION}/other/presentations`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, presentationMiddleware.insertPresentation)
);
app.put(
  `/${API_VERSION}/other/presentations`,
  (req: any, res: any, next: any) =>
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
app.post(
  `/${API_VERSION}/other/measurements`,
  (req: any, res: any, next: any) =>
    Response(req, res, next, measurementMiddleWare.insertMeasurements)
);
app.put(`/${API_VERSION}/other/measurements`, (req: any, res: any, next: any) =>
  Response(req, res, next, measurementMiddleWare.updateMeasurements)
);
app.delete(
  `/${API_VERSION}/other/measurements/:id_medicion`,
  (req: any, res: any, next: any) =>
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
app.get(`/${API_VERSION}/other/roles`, (req: any, res: any, next: any) =>
  Response(req, res, next, otherMiddleWare.getRoles)
);

export default app;
