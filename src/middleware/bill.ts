import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const billMiddleware = {
  getBillTable: async (req: any) => {
    const { idSucursal, fechaLog, fechaHasta, ban } = req.body;
    const response = await callSPWithCallback(
      "Call CON_consultaLlenarTablaFactura(?,?,?,?)",
      idSucursal,
      fechaLog,
      fechaHasta,
      ban
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  firstDateBill: async (req: any) => {
    const { idSucursal } = req.body;
    const response = await callSPWithCallback(
      "Call CON_consultaPrimerFechaFactura(?)",
      idSucursal
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getBillDetails: async (req: any) => {
    const { idFactura } = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaLlenarArticulos(?)",
      idFactura
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  cancelBill: async (req: any) => {
    //TODO Calculate fechaLog and horaLog
    const { idFactura, idMotivo, idUsuario } = req.body;
    const fechaLog = "";
    const horaLog = "";
    const response = await callSPWithCallback(
      "Call CON_consultaRegistrarFacturaAnulada(?,?,?,?,?)",
      idFactura,
      idMotivo,
      idUsuario,
      fechaLog,
      horaLog
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
