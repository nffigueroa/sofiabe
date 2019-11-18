import con from '../util/mysql';
import { getDateYYYYMMDD } from '../util/common';

const middlewares = {
    getProducts:  (req, res, next) => {
        const idSucursal = req.params.idSucursal;
        con.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('Call IVN_llenarTabla_Producto(?)', idSucursal, function (err, result) {
                if (err) throw err;
                res.send(result[0])
            });
        })
        next();
    },
    deleteProduct: (req, res, next) => {
        let idProducto = req.params.idProducto
        console.log('Se intenta eliminar el idProducto' + idProducto)
        con.getConnection(function (err, connection) {
            connection.query('Call IVN_eliminar_Producto(?)', [idProducto], function (err, result) {
                if (err) {
                    res.send(JSON.stringify({
                        deleted: false,
                        err: err
                    }))
                } 
            })
        })
    },
    saveProduct:  (req, res, next) => {
        console.log(req.body)
        const product_body = req.body;
        con.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('Call IVN_registrarProducto(?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                product_body.product_name,
                getDateYYYYMMDD(),
                product_body.product_creation_user,
                product_body.product_category,
                product_body.product_mark,
                product_body.product_measurement,
                product_body.product_presentation,
                product_body.product_id_sucursal
            ]
            , function (err, result) {
                if (err) throw err;
                res.send(result[0])
            });
        })
        next();
    },
}

export default middlewares;