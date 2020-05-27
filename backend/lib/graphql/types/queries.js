"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = "\n    type Query {\n        allAdmins: [AllAdmins]\n\n        allLabs: [allLabsCount]\n\n        oneLab(\n            nombre: String,\n            proyectoCategoria: String\n        ): [Proyecto]\n        \n        proyecto(\n            nombre: String\n            proyecto: String\n        ): Proyecto\n\n        alumnos(\n            nombre: String\n            proyecto: String\n            status: String\n        ): [_alumnos]\n\n        Count: [count]\n\n        solicitudes(\n            nombre: String\n        ): [Solicitudes]\n\n        infoAlumno(\n            usuario: String\n        ): infoAlumno\n\n        misSolicitudes: [MisSolicitudes]\n\n        infoLab: InfoLab\n\n        getLabName(\n            siglas: String\n        ): String\n\n        existeMetod(\n            nombre: String,\n            proyecto: String\n        ): String\n\n        existeRepo(\n            nombre: String,\n            proyecto: String\n        ): String\n\n        getFaseAct(\n            nombre: String,\n            proyecto: String\n        ): [_Actividades]\n\n        Colaboradores: [_colaboradores]\n\n        Colaborador: _colaboradores\n    }\n";
exports.queries = queries;