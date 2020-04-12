import { Brand } from "../models/Brand";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const brandMiddleware = {
  insertBrand: async (req: any) => {
    const category = req.body as Brand;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarMarca(?, ?)",
      category.marca,
      category.idUsuario
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
