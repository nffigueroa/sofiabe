import mysql from "mysql";

let connection: any = null;
const conexion = () => {
  if (!connection) {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Indigo0801*",
      database: "swincomc_20140512_siventas",
    });
  }
  connection.connect((err: any) => {
    if (err) {
      console.error("[db err", err);
      setTimeout(() => conexion, 2000);
    }
  });
  connection.on("error", (err: any) => {
    console.error("[db err", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conexion();
    } else {
      throw err;
    }
  });
};
conexion();
export default connection;
