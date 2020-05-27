"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connections = _interopRequireDefault(require("../db/connections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _connections["default"].Schema;
var adminSchema = new Schema({
  rol: String,
  nombre: String,
  usuario: {
    type: String,
    unique: true
  },
  clave: String,
  privilegios: String,
  telefono: String,
  correo: String
});

var admin = _connections["default"].model('admin', adminSchema);

var _default = admin;
exports["default"] = _default;