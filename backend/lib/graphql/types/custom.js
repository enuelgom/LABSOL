"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.custom = void 0;
var custom = "\n\n    type AllAdmins {\n        _id: String,\n        nombre: String,\n        correo: String,\n        telefono: String,\n        privilegios: String\n    }\n\n    type SubAdmin {\n        usuario: String,\n        nombre: String,\n        correo: String,\n        telefono: String,\n    }\n\n    type Laboratorio {\n        nombre: String,\n        logo: String,\n        proyectos: [Proyecto],\n        usuario: String,\n        clave: String\n    }\n\n    type Proyecto {\n        _id: String,\n        proyecto: String,\n        objetivo: String,\n        requerimientos: String,\n        perfiles: String,\n        habilidades: String,\n        avances: String,\n        status: String,\n        numAlu: String,\n        alumnosExistentes: String,\n        alumnos: [_ids],\n        notificaciones: String,\n        colaboradores: String\n    }\n\n    type Categorias{\n        proyecto: String,\n        objetivo: String,\n        status: String,\n        numAlu: String,\n    }\n\n    type Alumnos{\n        alumno: String,\n        ape_p: String,\n        ape_m: String,\n        correo: String,\n        telefono: String,\n        institucion: String,\n        carrera: String,\n        domicilio: String\n    }\n\n    type Segimiento{\n        Metodologia: String,\n        fases: [Fases]\n    }\n\n    type Fases{\n        fase: String,\n        actividades: [Actividades]\n    }\n\n    type Actividades{\n        actividad: String,\n        semanas: [Semanas],\n        status_actividad: String\n    }\n    type Semanas{\n        sem_ini: String,\n        sem_fin: String\n    }\n    \n    type _alumnos{\n        nombre: String,\n        institucion: String,\n        carrera: String,\n        telefono: String,\n        correo: String,\n        _id: String\n    }\n\n    type count{\n        nombre: String,\n        count: String\n    }\n\n    type allLabsCount{\n        siglas: String,\n        nombre: String,\n        count: String,\n        notificaciones: String,\n        tipoLaboratorio: String,\n    }\n\n    type _ids{\n        _id: String,\n        status: String\n    }\n\n    type Solicitudes{\n        alumno: String,\n        proyecto: String\n    }\n\n    type infoAlumno{\n        _id: String,\n        alumno: String,\n        ape_p: String,\n        ape_m: String,\n        correo: String,\n        telefono: String,\n        institucion: String,\n        semestre_cursado: String,\n        carrera: String,\n        domicilio: String,\n        usuario: String\n    }\n\n    type MisSolicitudes{\n        nombre: String,\n        proyecto: String,\n        status: String\n    }\n\n    type InfoLab{\n        nombre: String,\n        siglas: String,\n        usuario: String,    \n        tipoLaboratorio: String,\n    }\n\n    type _Actividades{\n        fase: String,\n        actividades: String,\n        semI: String,\n        semF: String,\n        evaluacion: String,\n        _rowVariant: String\n    }\n\n    type _colaboradores{\n        _id: String,\n        nombre: String,\n        telefono: String,\n        correo: String,\n        usuario: String\n    }\n\n";
exports.custom = custom;