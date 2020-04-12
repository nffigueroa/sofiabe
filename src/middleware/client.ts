import { callSPWithCallback } from "../network";
import { Client } from "../models/Client";
import { ResponseBodyBuilder } from "../models/responseBody";
import { registerMovements } from "../util/common";

const clientMiddleware = {
  getClients: async (req: any) => {
    const idSucursal = req.params.idSucursal;
    const response = await callSPWithCallback(
      "Call CLI_llenarTabla_Cliente(?)",
      idSucursal
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) =>
        ResponseBodyBuilder(500, true, { message: "getClients Err:" + err })
      );
    return response;
  },
  createNewClient: async (req: any) => {
    const bodyCereateNewClient: Client = req.body;
    const response = await callSPWithCallback(
      "Call CLI_registrarCliente(?,?,?,?,?,?,?,?,?)",
      bodyCereateNewClient.idSucursal,
      bodyCereateNewClient.nombre,
      bodyCereateNewClient.apellido,
      bodyCereateNewClient.telefono,
      bodyCereateNewClient.direccion,
      bodyCereateNewClient.mail,
      bodyCereateNewClient.id_ciudad,
      bodyCereateNewClient.id_usuario,
      bodyCereateNewClient.iden,
      bodyCereateNewClient.tipoCliente,
      bodyCereateNewClient.declaraIva,
      bodyCereateNewClient.declaraIca,
      bodyCereateNewClient.reteFuente,
      bodyCereateNewClient.milesIca,
      bodyCereateNewClient.dv
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((error) => ResponseBodyBuilder(500, false, error));
    return response;
  },
  deleteClient: async (req: any) => {
    const idClient = req.params.idClient;
    const response = await callSPWithCallback(
      "Call CLI_eliminar_Cliente(?)",
      idClient
    )
      .then((response) => {
        if (response) {
          return ResponseBodyBuilder(200, false, !!response);
        } else {
          return ResponseBodyBuilder(404, true, `Can not find id ${idClient}`);
        }
      })
      .catch((error) => ResponseBodyBuilder(500, false, error));
    return response;
  },
  updateClient: async (req: any) => {
    //const client = Object.assign(payLoad, req.body);
    const idClient = req.params.idClient;
    const response = await callSPWithCallback(
      "Call CLI_eliminar_Cliente(?, ?, ? , ?, ? , ?, ?)",
      req
    )
      .then((response) => {
        if (response) {
          return ResponseBodyBuilder(200, false, !!response);
        } else {
          return ResponseBodyBuilder(404, true, `Can not find id ${idClient}`);
        }
      })
      .catch((error) => ResponseBodyBuilder(500, false, error));
    return response;
  },
};

export default clientMiddleware;
