import { callSPWithCallback } from "../network";
import { ResponseBodyBuilder } from "../models/responseBody";
import { Provider } from "../models/Provider";

export const middlewareProvider = {
  getProviders: async (req: any) => {
    const { idSucursal } = req.params;
    const response = await callSPWithCallback(
      "Call PRO_consultaLlenarTablaProveedor(?)",
      idSucursal
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  insertProvider: async (req: any) => {
    const { idSucursal } = req.params;
    const newProvider: Provider = req.body;
    const response = await callSPWithCallback(
      "Call PRO_consultaLlenarTablaProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      newProvider
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  updateProvider: async (req: any) => {
    const { idSucursal } = req.params;
    const provider: Provider = req.body;
    const response = await callSPWithCallback(
      "Call GEN_consultaModificarProveedor(?,?,?,?,?,?,?,?)",
      provider
    )
      .then((response) => ResponseBodyBuilder(200, false, response))
      .catch((err) => ResponseBodyBuilder(500, true, err));
    return response;
  },
  getProviderCategories: async (req: any) => {
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
    const { id_proveedor } = req.params;
    const response = await callSPWithCallback(
      "Call GEN_eliminar_proveedor(?)",
      id_proveedor
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
