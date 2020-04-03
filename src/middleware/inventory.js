import { CreateProductInventory } from "../models/createProductInInventory";

export const middlewareInventory = {
    getQuantityAndProductCost: async() => {
        const { idSucursal } = req.params
        const response = await callSPWithCallback('Call IVN_consultaCantidadYCostoProducto(?)', idSucursal)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    insertQuantityProductInInventory: async() => {
        const { cantidad, id_producto } = req.body
        const response = await callSPWithCallback('Call IVN_consultaCantidadYCostoProducto(?, ?)', [cantidad, id_producto])
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    insertDiscountInProduct: async() => {
        const { cantidad, id_producto, id_usuario, motivo } = req.body
        const response = await callSPWithCallback('Call CON_consultaRegistrarDescuentoProducto(?, ?, ?, ?)', [cantidad, id_producto, id_usuario, motivo])
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    getInventory: async() => {
        const { idSucursal } = req.params
        const response = await callSPWithCallback('Call IVN_llenarTabla_inventario(?)', idSucursal)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    },
    insertProductIntoInventory: async(req) => {
        const newinventoryProduct = new CreateProductInventory(req.body);    
        const response = await callSPWithCallback('Call IVN_consultaRegistrarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)', newinventoryProduct)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response; 
    },
    getIdProductByname: async() => {
        const { producto } = req.body
        const response = await callSPWithCallback('Call IVN_consultaIdProducto(?)', producto)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response; 
    },
    updateInventoryProduct: async() => {
        const json = {
            id_producto,
            cantidad,
            stock,
            id_sucursal,
            id_proveedor,
            barras,
            precio1,
            precio2,
            iva,
            expiracion,
            id_usuario,
            id_producto_inventario
        }
        const updateProduct = Object.assign(json, req.body)
        const response = await callSPWithCallback('Call IVN_consultaActualizarProductoInventario(?,?,?,?,?,?,?,?,?,?,?,?,?)', [...updateProduct])
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response; 
    },
    removeInventoryproduct: async() => {
        const { idProducto } = req.body
        const response = await callSPWithCallback('Call IVN_consultaEliminarProductoInventario(?)', idProducto)
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response; 
    },
    registerDeletedProduct: async() => {
        const { id_producto_inventario,  descripcion, id_usuario, id_motivo} = req.body
        const response = await callSPWithCallback('Call GEN_consultaRegistrarProductoEliminado(?, ?, ?, ?)', [id_producto_inventario,  descripcion, id_usuario, id_motivo])
        .then((response) => ResponseBodyBuilder(200, false , response))
        .catch((err) => ResponseBodyBuilder(500, true , err))
        return response;
    }
}