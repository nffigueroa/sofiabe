import { ProductInventory } from "../models/ProductInventory";
import { ResponseBodyBuilder } from "../models/responseBody";
import { callSPWithCallback } from "../network";
import { decode } from "jsonwebtoken";

export const middlewareInventory = {
  getQuantityAndProductCost: async (req: any) => {
    const { idSucursal } = req.params;
    const response = await callSPWithCallback(
      "Call IVN_consultaCantidadYCostoProducto(?)",
      idSucursal
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertQuantityProductInInventory: async (req: any) => {
    const { cantidad, id_producto } = req.body;
    const response = await callSPWithCallback(
      "Call IVN_consultaCantidadYCostoProducto(?, ?)",
      cantidad,
      id_producto
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertDiscountInProduct: async (req: any) => {
    const { cantidad, id_producto, id_usuario, motivo } = req.body;
    const response = await callSPWithCallback(
      "Call CON_consultaRegistrarDescuentoProducto(?, ?, ?, ?)",
      cantidad,
      id_producto,
      id_usuario,
      motivo
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getInventory: async (req: any, token: string) => {
    const {
      data: { id_sucursal },
    }: any = decode(token);
    const response = await callSPWithCallback(
      "Call IVN_llenarTabla_inventario(?)",
      id_sucursal
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertProductIntoInventory: async (req: any, token: string) => {
    const newinventoryProduct: ProductInventory = req;
    const {
      data: { id_sucursal, id_usuario },
    }: any = decode(token);
    const response = await callSPWithCallback(
      "Call IVN_consultaRegistrarProductoInventario(?,?,?,?,?,?,?,?,?,?,?)",
      newinventoryProduct.id_Produccto,
      newinventoryProduct.cantidad,
      newinventoryProduct.stock,
      id_sucursal,
      newinventoryProduct.id_proveedor,
      newinventoryProduct.barras,
      newinventoryProduct.precio1,
      newinventoryProduct.precio2,
      newinventoryProduct.iva,
      newinventoryProduct.expiracion,
      id_usuario
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getIdProductByname: async (req: any) => {
    const { producto } = req.body;
    const response = await callSPWithCallback(
      "Call IVN_consultaIdProducto(?)",
      producto
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updateInventoryProduct: async (req: any) => {
    const updateProduct: ProductInventory = req.body;
    const response = await callSPWithCallback(
      "Call IVN_consultaActualizarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      updateProduct
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  removeInventoryproduct: async (req: any) => {
    const { idProducto } = req.body;
    const response = await callSPWithCallback(
      "Call IVN_consultaEliminarProductoInventario(?)",
      idProducto
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertDeletedProduct: async (req: any) => {
    const {
      id_producto_inventario,
      descripcion,
      id_usuario,
      id_motivo,
    } = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarProductoEliminado(?, ?, ?, ?)",
      [id_producto_inventario, descripcion, id_usuario, id_motivo]
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getFullInventoryByCompany: async (req: any) => {
    const { idEmpresa } = req.body;
    const response = await callSPWithCallback(
      "Call IVN_llenarTabla_inventarioStock(?)",
      idEmpresa
    )
      .then((response: any) => ResponseBodyBuilder(200, false, response))
      .catch((err: any) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
