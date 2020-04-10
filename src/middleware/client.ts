import { callSPWithCallback } from "../network";
import { Client } from "../models/Client";
import { ResponseBodyBuilder } from "../models/responseBody";
import { registerMovements } from "../util/common";

const clientMiddleware = {
  getClients: async (req: any, res: any, next: any) => {
    const idSucursal = req.params.idSucursal;
    const response = await callSPWithCallback(
      "Call CLI_llenarTabla_Cliente(?)",
      idSucursal
    )
      .then(response => ResponseBodyBuilder(200, false, response))
      .catch(err =>
        ResponseBodyBuilder(500, true, { message: "getClients Err:" + err })
      );
    return response;
  },
  createNewClient: async (req: any, res: any, next: any) => {
    const bodyCereateNewClient: Client = req.body;
    const response = await callSPWithCallback(
      "Call CLI_registrarCliente(?)",
      bodyCereateNewClient
    )
      .then(response => ResponseBodyBuilder(200, false, response))
      .catch(error => ResponseBodyBuilder(500, false, error));
    return response;
  },
  deleteClient: async (req: any, res: any, next: any) => {
    const idClient = req.params.idClient;
    const response = await callSPWithCallback(
      "Call CLI_eliminar_Cliente(?)",
      idClient
    )
      .then(response => {
        if (response) {
          return ResponseBodyBuilder(200, false, !!response);
        } else {
          return ResponseBodyBuilder(404, true, `Can not find id ${idClient}`);
        }
      })
      .catch(error => ResponseBodyBuilder(500, false, error));
    return response;
  },
  updateClient: async (req: any, res: any, next: any) => {
   
    //const client = Object.assign(payLoad, req.body);
    const idClient = req.params.idClient;
    const response = await callSPWithCallback(
      "Call CLI_eliminar_Cliente(?, ?, ? , ?, ? , ?, ?)",
      req
    )
      .then(response => {
        if (response) {
          return ResponseBodyBuilder(200, false, !!response);
        } else {
          return ResponseBodyBuilder(404, true, `Can not find id ${idClient}`);
        }
      })
      .catch(error => ResponseBodyBuilder(500, false, error));
    return response;
  }
};

export default clientMiddleware;
