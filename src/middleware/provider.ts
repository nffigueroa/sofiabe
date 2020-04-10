import { callSPWithCallback } from "../network"
import { ResponseBodyBuilder } from "../models/responseBody"
import { Provider } from "../models/Provider"

export const middlewareProvider = {
    getProviders: async(req: any) => {
        const { idSucursal } = req.params
        const response = await callSPWithCallback('Call PRO_consultaLlenarTablaProveedor(?)', idSucursal)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    insertProvider: async(req: any) => {
        const { idSucursal } = req.params
        const newProvider: Provider =  req.body;
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