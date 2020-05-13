import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";
import { decode } from "jsonwebtoken";

const otherMiddleWare = {
  getCategories: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLLenarComboCategoria()",
      ""
    );
    return {
      status: 200,
      body: response,
    };
  },
  getMarks: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLLenarComboMarca()",
      ""
    );
    return {
      status: 200,
      body: response,
    };
  },
  getPresentations: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLLenarComboPresentacion()",
      ""
    );
    return {
      status: 200,
      body: response,
    };
  },
  
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
  
  getCities: async () => {
    const response = await callSPWithCallback(
      "Call GEN_llenarComboCiudad_Mi_Sucursal()",
      ""
    );
    return {
      status: 200,
      body: response,
    };
  },
  getIdCompnay: async (req: any) => {
    const { idSucursal } = req.params;
    const response = await callSPWithCallback(
      "Call GEN_consultaIdEmpresa(?)",
      idSucursal
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getSucursalsByCompany: async (req: any) => {
    const { idEmpresa } = req.params;
    const response = await callSPWithCallback(
      "Call GEN_consultaLlenarComboSucursal(?)",
      idEmpresa
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getReasonForElimination: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaMotivosEliminacion()"
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getIdReasons: async (req: any) => {
    const { motivo } = req.params;
    const response = await callSPWithCallback(
      "Call GEN_consultaIdMotivo(?)",
      motivo
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getAllSucursalsByCompany: async (req: any, token: any) => {
    const { data: { id_empresa } }: any = decode(token);
    const response = await callSPWithCallback(
      "Call GEN_consultaSucursalXEmpresa(?)",
      id_empresa
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
};

export default otherMiddleWare;
