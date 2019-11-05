
import con from '../util/mysql';

const otherMiddleWare = {
    getCategories: (req, res, next) => {
        con.getConnection((err , connection) => {
            if (err) throw err;
            connection.query('Call GEN_consultaLLenarComboCategoria()', '', (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            })
        })
        next();
    },
    getMarks: (req, res, next) => {
        con.getConnection((err , connection) => {
            if (err) throw err;
            connection.query('Call GEN_consultaLLenarComboMarca()', '', (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            })
        })
        next();
    },
    getPresentations: (req, res, next) => {
        con.getConnection((err , connection) => {
            if (err) throw err;
            connection.query('Call GEN_consultaLLenarComboPresentacion()', '', (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            })
        })
        next();
    }
}

export default otherMiddleWare;