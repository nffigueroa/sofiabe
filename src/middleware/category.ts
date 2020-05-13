import { Category } from "../models/Category";
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
      category.id_usuario,
      category.categoria
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
    const category: Category = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarCategoria(?, ?)",
      category.id_categoria,
      category.categoria
    )
      .then((response) => {
          
            return ResponseBodyBuilder(200, false, !!response);
          
      })
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
