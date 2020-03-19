import mongoose from '../db/connections';
//import id_alu from "../models/id_alu";

// import Avances from "../models/avances";

const Schema = mongoose.Schema;
let id_alu = {
    _id: String,
    status: String
}

let Actividad = {
    _actividad: String,
    semanaInicio: String,
    semanaTerminacion: String,
    evaluacion: String
}

let fase = {
    fase: String,
    actividades: [Actividad]
}

let avance = {
    metodologia: String,
    fases: [fase]
}


const  proyectos = new Schema({
    proyecto: {type: String},
    objetivo: String,
    requerimientos: String,
    perfiles: String,
    habilidades: String,
    avances: avance,
    status: String,
    numAlu: String,
    alumnos:{
     type: [id_alu],
        // validate: [limit, 'exediste el limite']
     },
});
// function limit(val){
    // return val.length <= 6;
// }

export default proyectos;