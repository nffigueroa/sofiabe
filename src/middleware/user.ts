import con from "../network/mysql";
import { callSPWithCallback } from "../network";

import bcrypt from "bcrypt";
import { ResponseBodyBuilder } from "../models/responseBody";
import { key, SALTROUNDS } from "../util/const";
import { User } from "../models/User";
import { sign, getDateYYYYMMDD } from "../util/common";
import { decode } from "jsonwebtoken";

const userMiddleware = {
  getPasswordByUserName: async (userName: string) => {
    return await callSPWithCallback(
      "Call US_consultasPassword(?)",
      userName
    ).then((dbResponse: any) =>
      dbResponse[0] ? dbResponse[0].password : undefined
    );
  },
  getUserProperties: async (userName: string) => {
    return await callSPWithCallback(
      "Call US_consultasDatosLogeoUsuario(?)",
      userName
    ).then((dbResponse: any) => dbResponse[0]);
  },
  loginProcess: async ({ body }: any, res: any, next: any) => {
    const { userName, password } = body;
    try {
      return userMiddleware
        .getPasswordByUserName(userName)
        .then(async (passwordFromBd) => {
          if (!passwordFromBd) {
            return ResponseBodyBuilder(401, false, {
              message: "Not authtorized",
            });
          }
          const matches = await bcrypt.compare(password, passwordFromBd);
          if (matches) {
            const userProperties: User = await userMiddleware.getUserProperties(
              userName
            );
            return ResponseBodyBuilder(200, false, {
              ...{
                nombre_usuario: userProperties.nombre_usuario,
                apellido_usuario: userProperties.apellido_usuario,
                cc_usuario: userProperties.telefono_usuario,
                telefono_usuario: userProperties.telefono_usuario,
                token: sign(Object.assign({}, userProperties)),
              },
            });
          } else {
            return ResponseBodyBuilder(401, true, {
              message: "Invalid credentials",
            });
          }
        });
    } catch (err) {
      return ResponseBodyBuilder(500, true, { message: err.message });
    }
  },
  getUserByCompany: async (req: any, token: string) => {
    const {
      data: { id_empresa },
    } = decode(token) as any;
    const response = await callSPWithCallback(
      "CALL US_consultaLlenarTabla_Usuario(?)",
      id_empresa
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertUserProperties: async (req: any, token: string) => {
    const {
      data: { id_usuario },
    } = decode(token) as any;
    const newUser = req.body as User;
    newUser.password = await bcrypt.hash(newUser.password, SALTROUNDS);
    const response = await callSPWithCallback(
      "CALL US_consultaInstertarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      newUser.nombre_usuario,
      newUser.apellido_usuario,
      newUser.cc_usuario,
      newUser.telefono_usuario,
      newUser.direccion_usuario,
      newUser.id_cargo,
      newUser.descripcion,
      getDateYYYYMMDD(),
      id_usuario,
      newUser.id_sucursal,
      newUser.usuario,
      newUser.password
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updateUserProperties: async (req: any) => {
    const newUser = req.body as User;
    newUser.password = await bcrypt.hash(newUser.password, SALTROUNDS);
    const response = await callSPWithCallback(
      "CALL US_consultaModificarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      newUser.id_usuario,
      newUser.nombre_usuario,
      newUser.apellido_usuario,
      newUser.cc_usuario,
      newUser.telefono_usuario,
      newUser.direccion_usuario,
      newUser.id_cargo,
      newUser.descripcion,
      newUser.id_sucursal,
      newUser.usuario,
      newUser.password
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deleteUser: async (req: any) => {
    const id_usuario = req.params.idUsuario;
    const response = await callSPWithCallback(
      "CALL US_eliminarUsuario(?)",
      id_usuario
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};

export default userMiddleware;
