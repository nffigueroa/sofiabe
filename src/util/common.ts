import { callSPWithNotCallback, callSPWithCallback } from "../network";
import jwt from "jsonwebtoken";

var moment = require("moment");

export const getDateYYYYMMDD = () => {
  return moment().format("YYYY-MM-DD");
};

export const getCurrentTime = () => {
  return moment().format("HH:MM:SS");
};

export const registerMovements = ({
  proccess,
  id_usuario,
  descripcion,
}: any) => {
  try {
    callSPWithCallback(
      "Call US_registrarHistorial(? ,? ,? ,?, ?)",
      proccess,
      id_usuario,
      getDateYYYYMMDD(),
      getCurrentTime(),
      descripcion
    );
  } catch (error) {
    throw error;
  }
};

export const sign = (data: any) => {
  return jwt.sign(data, "swincomc_20140512_siventas");
};
