"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = __importDefault(require("./app.js"));
var PORT = 3001;
app_js_1.default.listen(PORT, function () {
    console.log("Running in http://localhost:" + PORT);
});
