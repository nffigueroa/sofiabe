import { callSPWithNotCallback } from '../network';
import jwt from 'jsonwebtoken';
var moment = require('moment');


export const getDateYYYYMMDD = () => {
   return moment().format('YYYY-MM-DD');
}

export const getCurrentTime = () => {
    return moment().format('HH:MM:SS')
}

export const registerMovements = ({id_usuario, descripcion}) => {
    callSPWithNotCallback('Call US_registrarHistorial(? ,? ,? ,? )', [id_usuario, , getDateYYYYMMDD(), getCurrentTime(), descripcion]);
}

export const sign = (data) => {
    return jwt.sign(data, 'swincomc_20140512_siventas');
}