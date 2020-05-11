import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const reportMiddleware = {
  getMostPopularProduct: async (req: any) => {
    const { idSucursal, fechaIni, fechaFin } = req.body;
    const response = await callSPWithCallback(
      "CALL IVN_consultaProductoVendidoXSucursal(?,?,?)",
      idSucursal,
      fechaIni,
      fechaFin
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getEntranceProduct: async (idCompany: number) => {
    //TODO Calculate idEmpresa with the idSucursal
    const response = await callSPWithCallback(
      "Call IVN_consultaProductosEntrada(?)",
      idCompany
    )
      .then((data) => data)
      .catch((err) => err);
    return response;
  },
  getProductOutlet: async (idCompany: number) => {
    const response = await callSPWithCallback(
      "Call IVN_consultaProductosSalida(?)",
      idCompany
    )
      .then((data) => data)
      .catch((err) => err);
    return response;
  },
  getEntranceAndOutletProduct: async (req: any) => {
    //TODO
  },
  getCoincidenceProvider: async (req: any) => {
    const { idProductoInventario } = req.body;
    const response = await callSPWithCallback(
      "CALL GEN_LlenarCoincidenciasProveedor(?)",
      idProductoInventario
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
