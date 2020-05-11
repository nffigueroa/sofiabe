import { Brand, IdBrand } from "../models/Brand";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const brandMiddleware = {
  getBrand: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLLenarComboPresentacion()",
      ""
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertBrand: async (req: any) => {
    const brand = req.body as Brand;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarMarca(?, ?)",
      brand.marca,
      brand.idUsuario
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deletetBrand: async (req: any) => {
    const brand = req.params.id_marca;
    const response = await callSPWithCallback(
      "Call GEN_consultaEliminarMarca(?)",
      brand
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updatetBrand: async (req: any) => {
    const IdBrand = req.body as IdBrand;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarMarca(?, ?)",
      IdBrand.idMarca,
      IdBrand.marca
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
