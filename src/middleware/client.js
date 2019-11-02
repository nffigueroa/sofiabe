import con from '../util/mysql';

const clientMiddleware = {
    getClients: (req, res, next) => {
        const idSucursal = req.params.idSucursal;
        con.getConnection((err , connection) => {
            if (err) throw err;
            connection.query('Call CLI_llenarTabla_Cliente(?)', idSucursal, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            })
        })
        next();
    }
}

export default clientMiddleware;