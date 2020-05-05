import { callSPWithNotCallback, callSPWithCallback } from "../network";
import * as jwtLibrady from "jsonwebtoken";
import { User } from "../models/User";
import { key } from "./const";

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
  return jwtLibrady.sign({ data, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, key);
};

export const verifyJWT = (jwt: string): User => jwtLibrady.verify(jwt, key) as User