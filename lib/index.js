"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = __importDefault(require("./app.js"));
var http = require("http").createServer(app_js_1.default);
var io = require("socket.io")(http);
io.on("connection", function (socket) {
    socket.on("request", function (res) { return console.log(res); });
});
var PORT = 3001;
http.listen(PORT, function () {
    console.log("Running in http://localhost:" + PORT);
});
