import { callSPWithCallback } from '../network';
import { CreateNewClient } from '../models/createNewClient';
import { ResponseBodyBuilder } from '../models/response';
import { registerMovements } from '../util/common';

const clientMiddleware = {
    getClients: async(req, res, next) => {
        const idSucursal = req.params.idSucursal;
        const response = await callSPWithCallback('Call CLI_llenarTabla_Cliente(?)', idSucursal)
        .then((response) => ResponseBodyBuilder(200, false, response))
        .catch((err) => ResponseBodyBuilder(500, true, {message:  'getClients Err:' + err}))
        return response;
    },
    createNewClient: async(req, res, next) => {
        const bodyCereateNewClient = new CreateNewClient(req.body);  
        const response = await callSPWithCallback('Call CLI_registrarCliente(?)', bodyCereateNewClient.clientBody)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((error) => ResponseBodyBuilder(500, false , error))
        return response;
    },
    deleteClient: async(req, res, next) => {
        const idClient = req.params.idClient;  
        const response = await callSPWithCallback('Call CLI_eliminar_Cliente(?)', idClient)
        .then((response) => {
            console.log(response)
            if (response) {
                return ResponseBodyBuilder(200, false , !!(response))
            } else {
                return ResponseBodyBuilder(404, true , `Can not find id ${idClient}`);
            }
        })
        .catch((error) => ResponseBodyBuilder(500, false , error))
        return response;
    }
}

export default clientMiddleware;