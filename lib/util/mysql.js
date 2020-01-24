"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var con = null;
var conexion = function conexion() {
    if (!con) {
        con = _mysql2.default.createConnection({
            host: "localhost",
            user: "root",
            password: "123123",
            database: 'swincomc_20140512_siventas'
        });
    }
    con.connect(function (err) {
        if (err) {
            console.error('[db err', err);
            setTimeout(function () {
                return conexion;
            }, 2000);
        }
    });
    con.on('error', function (err) {
        console.error('[db err', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexion();
        } else {
            throw err;
        }
    });
};
conexion();
exports.default = con;