import { key } from './const';
import CryptoJS from 'crypto-js'


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