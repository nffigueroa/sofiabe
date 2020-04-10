import con from "../network/mysql";
import { callSPWithCallback } from "../network";

import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { ResponseBodyBuilder } from "../models/responseBody";

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
            return ResponseBodyBuilder(200, false, {
              body: {
                token: sign(
                  { user: userName },
                  "{ user: userName }swincomc_20140512_siventas"
                ),
                userProperties: await userMiddleware.getUserProperties(
                  userName
                ),
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
};

export default userMiddleware;
