import con from '../util/mysql';

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
    }
}

export default middlewares;