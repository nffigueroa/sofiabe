"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var connection = null;
var conexion = function () {
    if (!connection) {
        connection = mysql_1.default.createConnection({
            host: "localhost",
            user: "root",
            password: "Indigo0801*",
            database: "swincomc_20140512_siventas",
        });
    }
    connection.connect(function (err) {
        if (err) {
            console.error("[db err", err);
            setTimeout(function () { return conexion; }, 2000);
        }
    });
    connection.on("error", function (err) {
        console.error("[db err", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            conexion();
        }
        else {
            throw err;
        }
    });
};
conexion();
exports.default = connection;
