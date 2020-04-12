import { getDateYYYYMMDD, registerMovements } from "../util/common";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

const middlewares = {
  getProducts: async (req: any) => {
    const idSucursal = req.params.idSucursal;
    const response = await callSPWithCallback(
      "Call IVN_llenarTabla_Producto(?)",
      idSucursal
    );
    return ResponseBodyBuilder(200, false, response);
  },
  deleteProduct: async (req: any) => {
    let idProducto = req.params.idProducto;
    const body = await callSPWithCallback(
      "Call IVN_eliminar_Producto(?)",
      idProducto
    )
      .then((response) => {
        return ResponseBodyBuilder(200, false, {
          propertyRemoved: !!response,
        });
      })
      .catch((err) => {
        return ResponseBodyBuilder(500, true, {
          message: "deleteProduct err: " + err,
        });
      });
    return body;
  },
  saveProduct: async (req: any) => {
    const product_body = req.body;

    const body = await callSPWithCallback(
      "Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)",
      product_body.product_name,
      getDateYYYYMMDD(),
      product_body.product_creation_user,
      product_body.product_category,
      product_body.product_mark,
      product_body.product_measurement,
      product_body.product_presentation,
      product_body.product_id_sucursal
    )
      .then((idProductoCreated: any) => {
        return ResponseBodyBuilder(200, false, {
          id_produccto: idProductoCreated[0].l_product_id,
        });
      })
      .catch((err) => {
        return ResponseBodyBuilder(500, true, {
          message: "saveProduct failed err:" + err,
        });
      });
    return body;
  },
  updateProduct: async (req: any) => {
    const product_body = req.body;
    registerMovements({
      id_usuario: product_body.product_creation_user,
      descripcion: `updateProduct con id ${product_body.product_id_producto}`,
    });
    const response = await callSPWithCallback(
      "Call IVN_consultaActualizarProducto(?, ?, ?, ?, ?, ?)",
      [
        product_body.product_id_producto,
        product_body.product_name,
        product_body.product_category,
        product_body.product_mark,
        product_body.product_measurement,
        product_body.product_presentation,
      ]
    );
    return {
      status: 200,
      body: response,
    };
  },
};

export default middlewares;
