import { callSPWithCallback } from "../network"
import { ResponseBodyBuilder } from "../models/response"
import { CreateNewProvider } from "../models/createNewProvider"

export const middlewareProvider = {
    getProviders: async(req) => {
        const { idSucursal } = req.params
        const response = await callSPWithCallback('Call PRO_consultaLlenarTablaProveedor(?)', idSucursal)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    insertProvider: async(req) => {
        const { idSucursal } = req.params
        const newProvider =  new CreateNewProvider(req.body);
        const response = await callSPWithCallback('Call PRO_consultaLlenarTablaProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', newProvider)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    updateProvider: () => {
        //TODO
    },
    getProviderCategories: () => {
        //TODO
    },
    deleteProvider: () => {
        //TODO
    },
    insertProviderCategory: () => {
        //TODO
    },
    getAllProviders: async() => {
        const response = await callSPWithCallback('Call GEN_consultaLlenarComboProveedor()')
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    }
}