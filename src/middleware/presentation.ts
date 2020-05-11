import { Presentation } from "../models/Presentation";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const presentationMiddleware = {
  getPresentation: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLLenarComboPresentacion()",
      ""
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertPresentation: async (req: any) => {
    const presentation = req.body as Presentation;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarPresentacion(?, ?)",
      presentation.presentacion
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deletetPresentation: async (req: any) => {
    const presentation = req.params.id_presentacion;
    const response = await callSPWithCallback(
      "Call GEN_consultaEliminarPresentacion(?)",
      presentation
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updatetPresentacion: async (req: any) => {
    const presentation = req.body as Presentation;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarPresentacion(?, ?)",
      presentation.idPresentacion,
      presentation.presentacion
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
