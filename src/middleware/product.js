const con = require('../mysql.js/index.js')

const middlewares = {
    getProducts: function (req, res, next) {
        con.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query('Call IVN_llenarTabla_Producto(?)',[1], function (err, result) {
                if (err) throw err;
                resProduct = result[0]
                res.send(JSON.stringify(resProduct))
            });
        })
    },
    deleteProduct: function (req, res, next) {
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

module.exports = middlewares