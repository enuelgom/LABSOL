"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connections = _interopRequireDefault(require("../db/connections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _connections["default"].Schema;
var colaboradorSchema = new Schema({
  nombre: String,
  telefono: String,
  correo: {
    required: true,
    type: String,
    unique: true
  },
  id_lab: String,
  usuario: {
    required: true,
    type: String,
    unique: true
  },
  clave: String
});

var colaborador = _connections["default"].model('colaborador', colaboradorSchema);

var _default = colaborador;
exports["default"] = _default;