
import con from '../util/mysql';
import { getCurrentTime, registerMovements } from '../util/common';
import { callSPWithCallback } from '../network';

const otherMiddleWare = {
    getCategories: (req, res, next) => {
        callSPWithCallback('Call GEN_consultaLLenarComboCategoria()', (response) => res.send(response), '')
        next();
    },
    getMarks: (req, res, next) => {
        callSPWithCallback('Call GEN_consultaLLenarComboMarca()',(response) => res.send(response) , '')
        next();
    },
    getPresentations: (req, res, next) => {
        callSPWithCallback('Call GEN_consultaLLenarComboPresentacion()', (response) => res.send(response), '')
        next();
    },
    getMeasurements: (req, res, next) => {
        callSPWithCallback('Call GEN_consultaLLenarComboMedicion()', (response) => res.send(response), '')
        next();
    }
}

export default otherMiddleWare;