import { Category } from "../models/Category";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const categoryMiddleWare = {
  insertCategory: async (req: any) => {
    const category = req.body as Category;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarCategoria(?, ?)",
      category
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
