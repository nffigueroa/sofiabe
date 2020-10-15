import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";
import { decode } from "jsonwebtoken";

export const billMiddleware = {
  getBillTable: async (req: any, token: string) => {
    const {
      data: { id_sucursal },
    }: any = decode(token);
    const { getBillDetails } = billMiddleware;
    const { from, to, showAllBills } = req.query;

    const response: any = await callSPWithCallback(
      "Call CON_consultaLlenarTablaFactura(?,?,?,?)",
      id_sucursal,
      from,
      to,
      Boolean(showAllBills)
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    response.body = await Promise.all(response.body.map(async (bill: any) => {
      bill.history = await getBillDetails(bill.id_factura);
      return bill;
    }));
    console.log(response);
    
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
  getBillDetails: async (idFactura: number) => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLlenarArticulos(?)",
      idFactura
    );
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
