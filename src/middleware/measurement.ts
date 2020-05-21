import { Measurements } from "../models/measurement";
import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";

export const measurementMiddleWare = {
    getMeasurements: async () => {
        const response = await callSPWithCallback(
          "Call GEN_consultaLLenarComboMedicion()",
          ""
        );
        return {
          status: 200,
          body: response,
        };
      },
  insertMeasurements: async (req: any) => {
    const measurements: Measurements = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaRegistrarMedicion(?)",
        measurements.medicion
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updateMeasurements: async (req: any) => {
    const measurements: Measurements = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarMedicion(?, ?)",
      measurements.id_medicion,
      measurements.medicion      
    )
      .then((response) => {
          
            return ResponseBodyBuilder(200, false, !!response);
          
      })
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deleteMeasurements: async (req: any) => {
    const idMeasurements = req.params.id_medicion;
    const response = await callSPWithCallback(
      "Call GEN_consultaEliminarMedicion(?)",
      idMeasurements
    )
      .then((data) => ResponseBodyBuilder(200, false, data))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};
