
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
    }
}

export default otherMiddleWare;