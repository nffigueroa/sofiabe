import mysql from 'mysql';

let  con = null;
const conexion = () => {
    if (!con) {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123123",
        database: 'swincomc_20140512_siventas'
        });
    }
    con.connect((err) => {
       if (err) {
        console.error('[db err', err);
        setTimeout(() => conexion, 2000);
       }
    })
    con.on('error', err => {
        console.error('[db err', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexion();
        } else {
            throw err;
        }
    })
}
conexion();
export default con;