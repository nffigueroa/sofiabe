"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var product_1 = __importDefault(require("./middleware/product"));
var user_1 = __importDefault(require("./middleware/user"));
var bodyParser = __importStar(require("body-parser"));
var client_1 = __importDefault(require("./middleware/client"));
var other_1 = __importDefault(require("./middleware/other"));
var middleware_1 = require("./middleware");
var const_1 = require("./util/const");
var provider_1 = require("./middleware/provider");
var category_1 = require("./middleware/category");
var brand_1 = require("./middleware/brand");
var presentation_1 = require("./middleware/presentation");
var measurement_1 = require("./middleware/measurement");
var inventory_1 = require("./middleware/inventory");
var bill_1 = require("./middleware/bill");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
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
app.get("/" + const_1.API_VERSION + "/bill", function (req, res, next) {
    return middleware_1.Response(req, res, next, bill_1.billMiddleware.getBillTable);
});
app.get("/" + const_1.API_VERSION + "/bill/articles", function (req, res, next) {
    return middleware_1.Response(req, res, next, bill_1.billMiddleware.getBillDetails);
});
/** Provider API */
app.get("/" + const_1.API_VERSION + "/provider", function (req, res, next) {
    return middleware_1.Response(req, res, next, provider_1.middlewareProvider.getProviders);
});
app.get("/" + const_1.API_VERSION + "/provider/categories/:id_proveedor", function (req, res, next) {
    return middleware_1.Response(req, res, next, provider_1.middlewareProvider.getProviderCategories);
});
app.put("/" + const_1.API_VERSION + "/provider", function (req, res, next) {
    return middleware_1.Response(req, res, next, provider_1.middlewareProvider.updateProvider);
});
app.post("/" + const_1.API_VERSION + "/provider", function (req, res, next) {
    return middleware_1.Response(req, res, next, provider_1.middlewareProvider.insertProvider);
});
app.delete("/" + const_1.API_VERSION + "/provider/:idProvider", function (req, res, next) {
    return middleware_1.Response(req, res, next, provider_1.middlewareProvider.deleteProvider);
});
/*Product API*/
app.get("/" + const_1.API_VERSION + "/product", function (req, res, next) {
    return middleware_1.Response(req, res, next, product_1.default.getProducts);
});
app.post("/" + const_1.API_VERSION + "/product", function (req, res, next) {
    return middleware_1.Response(req, res, next, product_1.default.saveProduct);
});
app.put("/" + const_1.API_VERSION + "/product", function (req, res, next) {
    return middleware_1.Response(req, res, next, product_1.default.updateProduct);
});
app.delete("/" + const_1.API_VERSION + "/product/:idProducto", function (req, res, next) {
    return middleware_1.Response(req, res, next, product_1.default.deleteProduct);
});
/** Inventory API */
app.get("/" + const_1.API_VERSION + "/inventory", function (req, res, next) {
    return middleware_1.Response(req, res, next, inventory_1.middlewareInventory.getInventory);
});
app.post("/" + const_1.API_VERSION + "/inventory/register", function (req, res, next) {
    return middleware_1.Response(req, res, next, inventory_1.middlewareInventory.insertProductIntoInventory);
});
app.get("/" + const_1.API_VERSION + "/inventory/bill/:idFactura/articles", function (req, res, next) { return middleware_1.Response(req, res, next, inventory_1.middlewareInventory.getArticlesByBill); });
/** Client API */
app.get("/" + const_1.API_VERSION + "/client", function (req, res, next) {
    return middleware_1.Response(req, res, next, client_1.default.getClients);
});
app.delete("/" + const_1.API_VERSION + "/client/:id_cliente", function (req, res, next) {
    return middleware_1.Response(req, res, next, client_1.default.deleteClient);
});
app.post("/" + const_1.API_VERSION + "/client/", function (req, res, next) {
    return middleware_1.Response(req, res, next, client_1.default.createNewClient);
});
app.put("/" + const_1.API_VERSION + "/client", function (req, res, next) {
    return middleware_1.Response(req, res, next, client_1.default.updateClient);
});
/** User API */
app.post("/" + const_1.API_VERSION + "/auth", function (req, res, next) {
    return middleware_1.Response(req, res, next, user_1.default.loginProcess, false);
});
app.get("/" + const_1.API_VERSION + "/user", function (req, res, next) {
    return middleware_1.Response(req, res, next, user_1.default.getUserByCompany);
});
app.post("/" + const_1.API_VERSION + "/user", function (req, res, next) {
    return middleware_1.Response(req, res, next, user_1.default.insertUserProperties);
});
app.put("/" + const_1.API_VERSION + "/user", function (req, res, next) {
    return middleware_1.Response(req, res, next, user_1.default.updateUserProperties);
});
app.delete("/" + const_1.API_VERSION + "/user/:idUsuario", function (req, res, next) {
    return middleware_1.Response(req, res, next, user_1.default.deleteUser);
});
/** Category API */
app.get("/" + const_1.API_VERSION + "/other/category", function (req, res, next) {
    return middleware_1.Response(req, res, next, category_1.categoryMiddleWare.getCategories);
});
app.post("/" + const_1.API_VERSION + "/other/category", function (req, res, next) {
    return middleware_1.Response(req, res, next, category_1.categoryMiddleWare.insertCategory);
});
app.put("/" + const_1.API_VERSION + "/other/category", function (req, res, next) {
    return middleware_1.Response(req, res, next, category_1.categoryMiddleWare.updateCategory);
});
app.delete("/" + const_1.API_VERSION + "/other/category/:id_categoria", function (req, res, next) {
    return middleware_1.Response(req, res, next, category_1.categoryMiddleWare.deleteCategory);
});
/** Brand API */
app.get("/" + const_1.API_VERSION + "/other/brand", function (req, res, next) {
    return middleware_1.Response(req, res, next, brand_1.brandMiddleware.getBrand);
});
app.post("/" + const_1.API_VERSION + "/other/brand", function (req, res, next) {
    return middleware_1.Response(req, res, next, brand_1.brandMiddleware.insertBrand);
});
app.put("/" + const_1.API_VERSION + "/other/brand", function (req, res, next) {
    return middleware_1.Response(req, res, next, brand_1.brandMiddleware.updatetBrand);
});
app.delete("/" + const_1.API_VERSION + "/other/brand/:id_marca", function (req, res, next) {
    return middleware_1.Response(req, res, next, brand_1.brandMiddleware.deletetBrand);
});
/** Presentation API */
app.get("/" + const_1.API_VERSION + "/other/presentations", function (req, res, next) {
    return middleware_1.Response(req, res, next, presentation_1.presentationMiddleware.getPresentation);
});
app.post("/" + const_1.API_VERSION + "/other/presentations", function (req, res, next) {
    return middleware_1.Response(req, res, next, presentation_1.presentationMiddleware.insertPresentation);
});
app.put("/" + const_1.API_VERSION + "/other/presentations", function (req, res, next) {
    return middleware_1.Response(req, res, next, presentation_1.presentationMiddleware.updatetPresentacion);
});
app.delete("/" + const_1.API_VERSION + "/other/presentations/:id_presentacion", function (req, res, next) {
    return middleware_1.Response(req, res, next, presentation_1.presentationMiddleware.deletetPresentation);
});
/** Measurements API */
app.get("/" + const_1.API_VERSION + "/other/measurements", function (req, res, next) {
    return middleware_1.Response(req, res, next, measurement_1.measurementMiddleWare.getMeasurements);
});
app.post("/" + const_1.API_VERSION + "/other/measurements", function (req, res, next) {
    return middleware_1.Response(req, res, next, measurement_1.measurementMiddleWare.insertMeasurements);
});
app.put("/" + const_1.API_VERSION + "/other/measurements", function (req, res, next) {
    return middleware_1.Response(req, res, next, measurement_1.measurementMiddleWare.updateMeasurements);
});
app.delete("/" + const_1.API_VERSION + "/other/measurements/:id_medicion", function (req, res, next) {
    return middleware_1.Response(req, res, next, measurement_1.measurementMiddleWare.deleteMeasurements);
});
/** Others API */
app.get("/" + const_1.API_VERSION + "/other/categories", function (req, res, next) {
    return middleware_1.Response(req, res, next, other_1.default.getCategories);
});
app.get("/" + const_1.API_VERSION + "/other/Brand", function (req, res, next) {
    return middleware_1.Response(req, res, next, other_1.default.getBrand);
});
app.get("/" + const_1.API_VERSION + "/other/presentations", function (req, res, next) {
    return middleware_1.Response(req, res, next, other_1.default.getPresentations);
});
app.get("/" + const_1.API_VERSION + "/other/cities", function (req, res, next) {
    return middleware_1.Response(req, res, next, other_1.default.getCities);
});
app.get("/" + const_1.API_VERSION + "/other/company/sucursal", function (req, res, next) {
    return middleware_1.Response(req, res, next, other_1.default.getAllSucursalsByCompany);
});
app.get("/" + const_1.API_VERSION + "/other/roles", function (req, res, next) {
    return middleware_1.Response(req, res, next, other_1.default.getRoles);
});
exports.default = app;
