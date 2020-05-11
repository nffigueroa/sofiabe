import con from "../network/mysql";
import { callSPWithCallback } from "../network";

import bcrypt from "bcrypt";
import { ResponseBodyBuilder } from "../models/responseBody";
import { key } from "../util/const";
import { User } from "../models/User";
import { sign } from "../util/common";

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
                token: sign(Object.assign({}, userProperties))
              }
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
};

export default userMiddleware;
