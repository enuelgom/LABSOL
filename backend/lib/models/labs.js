"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connections = _interopRequireDefault(require("../db/connections"));

var _proyectos = _interopRequireDefault(require("./proyectos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _connections["default"].Schema;
var labsSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  siglas: {
    type: String,
    unique: true,
    required: true
  },
  logo: {
    type: String
  },
  proyectos: [_proyectos["default"]],
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  clave: {
    type: String
  },
  tipoLaboratorio: String,
  _status: String
});

var labs = _connections["default"].model('labs', labsSchema);

var _default = labs;
exports["default"] = _default;