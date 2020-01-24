import { key } from './const';
import CryptoJS from 'crypto-js'
import con from '../util/mysql';
var moment = require('moment');



export const encrypt = (plainText) => {
    let b64 = CryptoJS.AES.encrypt(plainText, key).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

export const decrypt = (cipherText) => {
    let reb64 = CryptoJS.enc.Hex.parse(cipherText);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, key);
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}

export const getDateYYYYMMDD = () => {
   return moment().format('YYYY-MM-DD');
}

export const getCurrentTime = () => {
    return moment().format('HH:MM:SS')
}

export const registerMovements = ({id_usuario, descripcion}) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('Call US_registrarHistorial(? ,? ,? ,? )', [id_usuario, , getDateYYYYMMDD(), getCurrentTime(), descripcion], (err, result) => {
            if (err) throw err;
        })
    })
}