import { Category, IdCategory } from "../models/Category";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const categoryMiddleWare = {
  getCategories: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLLenarComboCategoria()",
      ""
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertCategory: async (req: any) => {
    const category: Category = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarCategoria(?, ?)",
      category.idUsuario,
      category.nombreCategoria
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deleteCategory: async (req: any) => {
    const idCategory = req.params.id_categoria;
    const response = await callSPWithCallback(
      "Call GEN_consultaEliminarCategoria(?)",
      idCategory
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },

  updateCategory: async (req: any) => {
    const category: IdCategory = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarCategoria(?, ?)",
      category.idCategoria,
      category.nombreCategoria
    )
      .then((response) => {
        if (response) {
          return ResponseBodyBuilder(
            404,
            true,
            `Can not find id ${category.nombreCategoria}`);
          
        } else {
          
            return ResponseBodyBuilder(200, false, !!response);
          
        }
      })
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
