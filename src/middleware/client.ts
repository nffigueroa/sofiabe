import { callSPWithCallback } from "../network";
import { Client } from "../models/Client";
import { ResponseBodyBuilder } from "../models/responseBody";
import { decode } from "jsonwebtoken";

const clientMiddleware = {
  getClients: async (req: any, token: string) => {
    const {
      data: { id_sucursal },
    }: any = decode(token);
    const response = await callSPWithCallback(
      "Call CLI_llenarTabla_Cliente(?)",
      id_sucursal
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) =>
        ResponseBodyBuilder(500, true, { message: "getClients Err:" + err })
      );
    return response;
  },
  createNewClient: async (req: any) => {
    const bodyCereateNewClient = req.body as Client;
    // registerMovements({process: 'createNewClient', id_usuario:  bodyCereateNewClient.id_usuario, descripcion: `Se registra cliente id_usuario: ${bodyCereateNewClient.id_usuario}`})
    const response = await callSPWithCallback(
      "Call CLI_registrarCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      bodyCereateNewClient.id_sucursal,
      bodyCereateNewClient.nombre_cliente,
      bodyCereateNewClient.apellido_cliente,
      bodyCereateNewClient.telefono_cliente,
      bodyCereateNewClient.direccion_cliente,
      bodyCereateNewClient.mail_cliente,
      bodyCereateNewClient.id_ciudad,
      bodyCereateNewClient.id_usuario,
      bodyCereateNewClient.cedula_cliente,
      bodyCereateNewClient.esJuridico,
      bodyCereateNewClient.declaraIva,
      bodyCereateNewClient.declaraIca,
      bodyCereateNewClient.reteFuente,
      bodyCereateNewClient.milesIca,
      bodyCereateNewClient.dv
    )
      .then((response: any) => {
        console.log(response);
        //registerMovements({process: 'createNewClient', id_usuario:  bodyCereateNewClient.id_usuario, descripcion: `Registro de cliente exitoso id_cliente: ${response.id_cliente}`})
        return ResponseBodyBuilder(200, false, {
          ...response[0],
        });
      })
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
    const clientUpdated = req.body as Client;
    console.log(clientUpdated);
    const response = await callSPWithCallback(
      "Call CLI_consultaActualizarCliente(?, ?, ? , ?, ? , ?, ?)",
      clientUpdated
    )
      .then((response) => {
        if (response) {
          return ResponseBodyBuilder(200, false, !!response);
        } else {
          return ResponseBodyBuilder(
            404,
            true,
            `Can not find id ${clientUpdated.id_cliente}`
          );
        }
      })
      .catch((error) => ResponseBodyBuilder(500, false, error));
    return response;
  },
};

export default clientMiddleware;
