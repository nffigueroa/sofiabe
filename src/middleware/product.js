import con from '../util/mysql';
import { getDateYYYYMMDD } from '../util/common';
import { registerMovements } from '../../lib/util/common';
import { callSPWithCallback } from '../network';

const middlewares = {
    getProducts:  (req, res, next) => {
        const idSucursal = req.params.idSucursal;

        callSPWithCallback('Call IVN_llenarTabla_Producto(?)', (response) => {console.log(response); res.send(response)} ,idSucursal)
        next();
    },
    deleteProduct: (req, res, next) => {
        let idProducto = req.params.idProducto

        callSPWithCallback('Call IVN_eliminar_Producto(?)',(response) => res.send(response),  [idProducto])
    

        next()
    },
    saveProduct:  (req, res, next) => {
        const product_body = req.body;

        callSPWithCallback('Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)', (response) => res.send(response),
        [
            product_body.product_name,
            getDateYYYYMMDD(),
            product_body.product_creation_user,
            product_body.product_category,
            product_body.product_mark,
            product_body.product_measurement,
            product_body.product_presentation,
            product_body.product_id_sucursal
        ])
    
        next();
    },
    updateProduct:  (req, res, next) => {
        const product_body = req.body;
        registerMovements({id_usuario: product_body.product_creation_user, descripcion: `updateProduct con id ${product_body.product_id_producto}`})
        callSPWithCallback('Call IVN_consultaActualizarProducto(?, ?, ?, ?, ?, ?)', (response) => res.send(response),
        [
            product_body.product_id_producto,
            product_body.product_name,
            product_body.product_category,
            product_body.product_mark,
            product_body.product_measurement,
            product_body.product_presentation,
        ])
        next();
    },
}

export default middlewares;