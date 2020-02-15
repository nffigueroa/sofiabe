
import { callSPWithCallback } from '../network';

const otherMiddleWare = {
    getCategories: async(req, res, next) => {
        const response = await callSPWithCallback('Call GEN_consultaLLenarComboCategoria()', '')
        return {
            status: 200,
            body: response
        }
    },
    getMarks: async(req, res, next) => {
        const response = await callSPWithCallback('Call GEN_consultaLLenarComboMarca()','')
        return {
            status: 200,
            body: response
        }
    },
    getPresentations: async(req, res, next) => {
        const response = await callSPWithCallback('Call GEN_consultaLLenarComboPresentacion()',  '')
        return {
            status: 200,
            body: response
        }
    },
    getMeasurements: async(req, res, next) => {
        const response = await callSPWithCallback('Call GEN_consultaLLenarComboMedicion()',  '');
        return {
            status: 200,
            body: response
        }
    },
    getCities: async(req, res, next) => {
        const response = await callSPWithCallback('Call GEN_llenarComboCidad_Mi_Sucursal()', '')
        return {
            status: 200,
            body: response
        }
    },
    getIdCompnay: async(req) => {
        const { idSucursal } = req.params
        const response = await callSPWithCallback('Call GEN_consultaIdEmpresa(?)', idSucursal)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    getSucursalsByCompany: async() => {
        const { idEmpresa } = req.params
        const response = await callSPWithCallback('Call GEN_consultaLlenarComboSucursal(?)', idEmpresa)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    getReasonForElimination: async() => {
        const response = await callSPWithCallback('Call GEN_consultaMotivosEliminacion()')
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    getIdReasons: async(req) => {
        const { motivo } = req.params
        const response = await callSPWithCallback('Call GEN_consultaIdMotivo(?)', motivo)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },

}

export default otherMiddleWare;