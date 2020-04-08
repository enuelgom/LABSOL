"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connections = _interopRequireDefault(require("../db/connections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _connections["default"].Schema;
var solicitud = {
  nombre: String,
  proyecto: String,
  _status: String
};
var alumnosSchema = new Schema({
  alumno: String,
  ape_p: String,
  ape_m: String,
  correo: {
    required: true,
    type: String,
    unique: true
  },
  telefono: {
    type: String
  },
  institucion: String,
  carrera: String,
  semestre_cursado: String,
  domicilio: String,
  solicitudes: {
    type: [solicitud]
  },
  usuario: {
    required: true,
    type: String,
    unique: true
  },
  clave: String
});

var alumnos = _connections["default"].model('alumnos', alumnosSchema);

var _default = alumnos;
exports["default"] = _default;