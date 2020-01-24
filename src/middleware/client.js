import { callSPWithCallback } from '../network';
import { CreateNewClient } from '../models/createNewClient';

const clientMiddleware = {
    getClients: (req, res, next) => {
        const idSucursal = req.params.idSucursal;
        callSPWithCallback('Call CLI_llenarTabla_Cliente(?)',(response) => res.send(response),  idSucursal);
        next();
    },
    createNewClient: (req, res, next) => {
        const idSucursal = req.params.idSucursal;
        const bodyCereateNewClient = new CreateNewClient(req.body);
        console.log(bodyCereateNewClient)
        callSPWithCallback('Call CLI_registrarCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', (response) => res.send(response) , []);
        next();
    }
}

export default clientMiddleware;