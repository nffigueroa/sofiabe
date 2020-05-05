import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";
import { Provider } from "../models/Provider";
import { getDateYYYYMMDD, getCurrentTime, verifyJWT } from "../util/common";
import { User } from "../models/User";
import { decode } from "jsonwebtoken";

export const middlewareProvider = {
  getProviders: async (req: any, token: string) => {
    const {data: {id_sucursal}}: any = decode(token);
    const response = await callSPWithCallback(
      "Call PRO_consultaLlenarTablaProveedor(?)",
      id_sucursal
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertProvider: async (req: any) => {
    const newProvider: Provider = req.body;
    newProvider.fecha_crea = getDateYYYYMMDD()
    const response = await callSPWithCallback(
      "Call PRO_consultaInsertarProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      newProvider.empresa,
      newProvider.contaco_empresa,
      newProvider.telefono_proveedor,
      newProvider.direccion_proveedor,
      newProvider.mail_proveedor,
      newProvider.id_ciudad,
      newProvider.nit_proveedor,
      newProvider.id_usuario,
      newProvider.fecha_crea,
      newProvider.id_sucursal
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updateProvider: async (req: any) => {
    const provider: Provider = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarProveedor(?,?,?,?,?,?,?,?)",
      provider.id_proveedor,
      provider.empresa,
      provider.contaco_empresa,
      provider.telefono_proveedor,
      provider.direccion_proveedor,
      provider.mail_proveedor,
      provider.id_ciudad,
      provider.nit_proveedor
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getProviderCategories: async (req: any, token: string) => {
    const { id_proveedor } = req.params;
    const response = await callSPWithCallback(
      "Call GEN_CategoriasProveedorConsultar(?)",
      id_proveedor
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deleteProvider: async (req: any) => {
    const { idProvider } = req.params;
    const response = await callSPWithCallback(
      "Call GEN_eliminar_proveedor(?)",
      idProvider
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updateProviderCategory: async (req: any) => {
    const { categories, nitProveedor } = req.body;
    const id_proveedor = (await middlewareProvider.getIdProviderByNit(
      nitProveedor
    )) as number;
    const categoriesClear = await middlewareProvider.deleteAllProviderCategories(
      id_proveedor
    );
    const response = await middlewareProvider.insertCategoriesProvider(
      categories,
      id_proveedor
    );
    return response;
  },
  getAllProviders: async () => {
    const response = await callSPWithCallback(
      "Call GEN_consultaLlenarComboProveedor()"
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getIdProviderByNit: async (nit: string) => {
    const response = await callSPWithCallback(
      "Call GEN_consultaSelectProveedor(?)",
      nit
    )
      .then((response) => response)
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  deleteAllProviderCategories: async (id_proveedor: number) => {
    const response = await callSPWithCallback(
      "Call GEN_eliminar_Categoria_Proveedor(?)",
      id_proveedor
    )
      .then((response) => response)
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertCategoriesProvider: async (
    categories: Array<string>,
    id_proveedor: number
  ) => {
    categories.map(async (ids) => {
      const response = await callSPWithCallback(
        "call GEN_registrarCategoriaProveedor(?)",
        [ids, id_proveedor]
      );
    });
  },
};
