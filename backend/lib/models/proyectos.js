"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connections = _interopRequireDefault(require("../db/connections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import id_alu from "../models/id_alu";
// import Avances from "../models/avances";
var Schema = _connections["default"].Schema;
var colaborador = {
  _id: String
};
var id_alu = {
  _id: String,
  status: String
};
var Actividad = {
  _actividad: String,
  semanaInicio: String,
  semanaTerminacion: String,
  evaluacion: String
};
var fase = {
  fase: String,
  actividades: [Actividad]
};
var avance = {
  repositorio: String,
  metodologia: String,
  fases: [fase]
};
var proyectos = new Schema({
  proyecto: {
    type: String
  },
  objetivo: String,
  requerimientos: String,
  perfiles: String,
  habilidades: String,
  avances: avance,
  status: String,
  numAlu: String,
  alumnos: {
    type: [id_alu] // validate: [limit, 'exediste el limite']

  },
  colaboradores: String
}); // function limit(val){
// return val.length <= 6;
// }

var _default = proyectos;
exports["default"] = _default;